import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ---------- GET /api/projects ---------- */
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { dateCreated: "desc" },
    include: {
      projectManager: { select: { id: true, name: true, email: true } },
      financials: { select: { forecast: true, budget: true, actuals: true } },
    },
  });
  return NextResponse.json(projects);
}

/* ---------- POST /api/projects ---------- */
export async function POST(req: Request) {
  const body = await req.json();
  const saved = await prisma.project.create({
    data: {
      projectID: body.projectID,                 // generate this on the client or here
      title: body.title,
      description: body.description,
      phase: body.phase ?? "Planning",
      plannedStartDate: body.plannedStartDate,
      plannedEndDate: body.plannedEndDate,
      projectManager: body.projectManagerId
        ? { connect: { id: body.projectManagerId } }
        : undefined,

      // 👇  create the one-to-one ProjectFinancials row
      financials: {
        create: {
          forecast: body.forecast ?? 0,
          budget:   body.budget   ?? 0,
          actuals:  body.actuals  ?? 0,
        },
      },
    },
    include: {
      projectManager: true,
      financials: true,
    },
  });

  return NextResponse.json(saved, { status: 201 });
}
