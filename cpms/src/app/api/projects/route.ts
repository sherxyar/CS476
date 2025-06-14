import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ───────────────────────────────────────────
   list all projects  →  GET /api/projects
─────────────────────────────────────────── */
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { dateCreated: "desc" },
    include: {
      projectManager: {            // brings back PM info for the table
        select: { id: true, name: true, email: true },
      },
    },
  });

  return NextResponse.json(projects);
}

/* ───────────────────────────────────────────
   create a new project  →  POST /api/projects
─────────────────────────────────────────── */
export async function POST(req: Request) {
  const body = await req.json();

  /* ---- super-light validation ---- */
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

  /* ---- transactional insert ---- */
  const project = await prisma.$transaction(async (tx) => {
    // build next human-friendly ID: YYYY-0001, YYYY-0002, …
    const year = new Date().getFullYear();
    const countThisYear = await tx.project.count({
      where: { dateCreated: { gte: new Date(`${year}-01-01T00:00:00Z`) } },
    });
    const projectID = `${year}-${String(countThisYear + 1).padStart(4, "0")}`;

    return tx.project.create({
      data: {
        projectID,
        title:       body.title,
        description: body.description ?? "",
        phase:       body.phase ?? "Planning",

        /* relation saved here — Prisma validates FK automatically */
        projectManager:
          pmId !== null ? { connect: { id: pmId } } : undefined,

        forecast: Number(body.forecast) || 0,
        actuals:  Number(body.actuals)  || 0,
        budget:   Number(body.budget)   || 0,

        plannedStartDate: new Date(body.plannedStartDate),
        plannedEndDate:   new Date(body.plannedEndDate),
      },
      include: {
        projectManager: { select: { id: true, name: true, email: true } },
      },
    });
  });

  return NextResponse.json(project, { status: 201 });
}
