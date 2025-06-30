import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

//
// GET /api/projects/[id]  – fetch a single project
//
export async function GET(_req: Request, props: Context) {
  const params = await props.params;
  const { id } = params;

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
          include: { changedBy: { select: { id: true, name: true, email: true } } },
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

//
// PATCH /api/projects/[id]  – update phase / financials / add note
//
export async function PATCH(req: Request, props: Context) {
  const params = await props.params;
  const { id } = params;
  const body = await req.json();

  /*  Phase update  */
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

  /*  Add a PM note */
  if (body.note) {
    const { note, userId } = body;

    if (typeof note !== "string" || !note.trim()) {
      return NextResponse.json({ error: "note must be a non-empty string" }, { status: 400 });
    }
    if (typeof userId !== "number") {
      return NextResponse.json({ error: "userId must be a number" }, { status: 400 });
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

  /*  Financials update  */
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
    // Fetch all three numeric columns so the result is strongly typed
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

//
// DELETE /api/projects/[id]  – remove project
//
export async function DELETE(_req: Request, props: Context) {
  const params = await props.params;
  const { id } = params;

  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(`DELETE /api/projects/${id} error:`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
