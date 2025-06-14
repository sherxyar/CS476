import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ───────────────────────────────────────────
   list all projects  --- GET /api/projects --- we need to adjust for the fields as needed here
─────────────────────────────────────────── */
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { dateCreated: "desc" },
    select: {
      projectID: true,
      title: true,
      status: true,             
      phase: true,
      dateCreated: true,
      lastUpdated: true,
      description: true,
      pmNotes: true,
      plannedStartDate: true,
      plannedEndDate: true,
      projectManager: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(projects);
}

/* ───────────────────────────────────────────
   create a new project  ----  POST /api/projects
─────────────────────────────────────────── */
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const pmId =
    body.projectManagerId !== undefined && body.projectManagerId !== null
      ? Number(body.projectManagerId)
      : null;

  if (pmId !== null && Number.isNaN(pmId)) {
    return NextResponse.json(
      { error: "projectManagerId must be a number" },
      { status: 400 }
    );
  }

  const project = await prisma.$transaction(async (tx) => {
    // Generate a unique project ID based on the current year and count of projects created this year
    const year = new Date().getFullYear();
    const countThisYear = await tx.project.count({
      where: { dateCreated: { gte: new Date(`${year}-01-01T00:00:00Z`) } },
    });
    const projectID = `${year}-${String(countThisYear + 1).padStart(4, "0")}`;

    return tx.project.create({
      data: {
        projectID,
        title: body.title,
        description: body.description ?? "",
        phase: body.phase ?? "Planning",

        /* relation saved here — Prisma validates ForeignKey automatically */
        projectManager:
          pmId !== null ? { connect: { id: pmId } } : undefined,

        forecast: Number(body.forecast) || 0,
        actuals: Number(body.actuals) || 0,
        budget: Number(body.budget) || 0,

        plannedStartDate: new Date(body.plannedStartDate),
        plannedEndDate: new Date(body.plannedEndDate),
      },
      select: {
        projectID: true,
        title: true,
        phase: true,
        dateCreated: true,
        lastUpdated: true,
        status: true,
        description: true,
        pmNotes: true,
        plannedStartDate: true,
        plannedEndDate: true,
        projectManager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  });

  return NextResponse.json(project, { status: 201 });
}
