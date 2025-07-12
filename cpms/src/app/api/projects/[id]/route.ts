import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NotificationObserver } from "@/lib/notification-observer";

type Context = { params: Promise<{ id: string }> };

//  GET Request for projects
export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;               

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        projectManager: true,
        pmNotesHistory: {
          orderBy: { createdAt: "desc" },
          include: {
            author: { select: { id: true, name: true, email: true } },
          },
        },
        financialHistory: {
          include: {
            changedBy: { select: { id: true, name: true, email: true } },
          },
          orderBy: { changedAt: "desc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err) {
    console.error(`GET /api/projects/${id} error:`, err);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

// Projcet Updates - PATCH
export async function PATCH(req: NextRequest, { params }: Context) {
  const { id } = await params;
  const body = await req.json();

  if (body.phase) {
    try {
      const updated = await prisma.project.update({
        where: { id },
        data: { phase: body.phase, lastUpdated: new Date() },
      });
      return NextResponse.json(updated);
    } catch (err) {
      console.error(`PATCH /api/projects/${id} (phase) error:`, err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  if (body.title !== undefined || body.description !== undefined || body.projectManagerId !== undefined) {
    try {
      // Get current user session for notification purposes
      const session = await getServerSession(authOptions);
      const triggeredBy = session?.user?.id;

      const updateData: any = { lastUpdated: new Date() };
      
      if (body.title !== undefined) updateData.title = body.title;
      if (body.description !== undefined) updateData.description = body.description;
      if (body.projectManagerId !== undefined) {
        if (body.projectManagerId === null) {
          updateData.projectManager = { disconnect: true };
        } else {
          updateData.projectManager = { connect: { id: body.projectManagerId } };
        }
      }

      const updated = await prisma.project.update({
        where: { id },
        data: updateData,
        include: {
          projectManager: true,
          pmNotesHistory: {
            orderBy: { createdAt: "desc" },
            include: {
              author: { select: { id: true, name: true, email: true } },
            },
          },
          financialHistory: {
            include: {
              changedBy: { select: { id: true, name: true, email: true } },
            },
            orderBy: { changedAt: "desc" },
          },
        },
      });

      // Send notification to project manager about the update
      const changes: Record<string, any> = {};
      if (body.title !== undefined) changes.title = body.title;
      if (body.description !== undefined) changes.description = body.description;
      if (body.projectManagerId !== undefined) changes.projectManagerId = body.projectManagerId;

      await NotificationObserver.notifyProjectUpdate(id, changes, triggeredBy);

      return NextResponse.json(updated);
    } catch (err) {
      console.error(`PATCH /api/projects/${id} (general) error:`, err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }


  if (body.note) {
    const { note, userId } = body;

    if (typeof note !== "string" || !note.trim()) {
      return NextResponse.json(
        { error: "note must be a non-empty string" },
        { status: 400 },
      );
    }
    if (typeof userId !== "number") {
      return NextResponse.json(
        { error: "userId must be a number" },
        { status: 400 },
      );
    }

    try {
      const updated = await prisma.project.update({
        where: { id },
        data: {
          lastUpdated: new Date(),
          pmNotesHistory: {
            create: {
              note: note.trim(),
              userId,
            },
          },
        },
        include: {
          pmNotesHistory: { orderBy: { createdAt: "desc" } },
        },
      });
      return NextResponse.json(updated);
    } catch (err) {
      console.error(`PATCH /api/projects/${id} (note) error:`, err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  const { field, newValue, reason, userId } = body;

  if (!["forecast", "budget", "actuals"].includes(field)) {
    return NextResponse.json({ error: "Invalid field name" }, { status: 400 });
  }
  if (typeof newValue !== "number" || Number.isNaN(newValue)) {
    return NextResponse.json({ error: "newValue must be a number" }, { status: 400 });
  }
  if (typeof userId !== "number") {
    return NextResponse.json({ error: "userId must be a number" }, { status: 400 });
  }

  type NumericField = "forecast" | "budget" | "actuals";
  const numericField = field as NumericField;

  try {
    // Get current user session for notification purposes
    const session = await getServerSession(authOptions);
    const triggeredBy = session?.user?.id;

    const current = await prisma.project.findUnique({
      where: { id },
      select: { forecast: true, budget: true, actuals: true },
    });

    if (!current) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const oldValue = current[numericField];

    if (oldValue === newValue) {
      return NextResponse.json({ message: "No changes detected" });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        [numericField]: newValue,
        lastUpdated: new Date(),
        financialHistory: {
          create: {
            field: numericField,
            oldValue,
            newValue,
            reason: reason ?? "",
            userId,
          },
        },
      },
      include: {
        financialHistory: {
          include: {
            changedBy: { select: { id: true, name: true, email: true } },
          },
          orderBy: { changedAt: "desc" },
        },
      },
    });

    // Send notification to project manager about the financial change
    await NotificationObserver.notifyFinancialChange(
      id, 
      numericField, 
      oldValue, 
      newValue, 
      triggeredBy
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error(`PATCH /api/projects/${id} (financial) error:`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE - by Admins
export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params;

  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(`DELETE /api/projects/${id} error:`, err);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
