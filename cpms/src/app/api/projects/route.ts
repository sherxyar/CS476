import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ───────────────────────────────────────────
    list all projects
─────────────────────────────────────────── */
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { dateCreated: "desc" },
  });
  return NextResponse.json(projects);
}

/* ───────────────────────────────────────────
   create a new project
─────────────────────────────────────────── */
export async function POST(req: Request) {
  const body = await req.json();

  // TODO: add real validation 
  const project = await prisma.$transaction(async (tx) => {

    const year   = new Date().getFullYear();
    const count  = await tx.project.count({
      where: { dateCreated: { gte: new Date(`${year}-01-01T00:00:00Z`) } },
    });
    const projectID = `-${year}-${String(count + 1).padStart(4, "0")}`;

    /*  Insert the row */
    return tx.project.create({
      data: {
        projectID,
        title:            body.title,
        description:      body.description ?? "",
        phase:            body.phase ?? "Planning",

        projectManagerId: body.projectManagerId ?? null,   // FK, nullable
        forecast:         Number(body.forecast) ?? 0,
        actuals:          Number(body.actuals)  ?? 0,
        budget:           Number(body.budget)   ?? 0,

        plannedStartDate: new Date(body.plannedStartDate),
        plannedEndDate:   new Date(body.plannedEndDate),
      },
    });
  });

  return NextResponse.json(project, { status: 201 });
}
