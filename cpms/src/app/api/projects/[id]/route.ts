import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = { params: { id: string } };

// GET request to fetch project details by ID
export async function GET(_req: Request, context: Context) {
  const { id } = await context.params; // <-- MUST await

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        projectManager: true,
        pmNotesHistory: true,
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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH request to update project details
export async function PATCH(req: Request, context: Context) {
  const { id } = await context.params;
  const body = await req.json();

  // Project Phase update
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

  // Project Financials update
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
  const numericField = field as "forecast" | "budget" | "actuals";

  try {
    const current = await prisma.project.findUnique({
      where: { id },
      select: { [numericField]: true },
    });
    if (!current) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const oldValue = (current as any)[numericField] as number;
    if (oldValue === newValue) return NextResponse.json({ message: "No changes detected" });

    const updated = await prisma.project.update({
      where: { id },
      data: {
        [numericField]: newValue,
        lastUpdated: new Date(),
        financialHistory: {
          create: { field: numericField, oldValue, newValue, reason: reason ?? "", userId },
        },
      },
      include: {
        financialHistory: {
          include: { changedBy: { select: { id: true, name: true, email: true } } },
          orderBy: { changedAt: "desc" },
        },
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(`PATCH /api/projects/${id} (financial) error:`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DeLETE request to remove a project by ID
export async function DELETE(_req: Request, context: Context) {
  const { id } = await context.params;
  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(`DELETE /api/projects/${id} error:`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
