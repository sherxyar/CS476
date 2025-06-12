import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET /api/projects  to list all projects
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { dateCreated: 'desc' },
  });
  return NextResponse.json(projects);
}

// POST /api/projects  to create a new project
export async function POST(req: Request) {
  const body = await req.json();

  // TODO: Need to add validations.
  const project = await prisma.project.create({
    data: {
      title:            body.title,
      description:      body.description ?? '',
      projectmanager:   body.projectmanager,
      phase:            body.phase ?? 'Planning',  // see schema change below
      forecast:         body.forecast ?? 0,
      actuals:          body.actuals  ?? 0,
      budget:           body.budget   ?? 0,
      plannedStartDate: body.plannedStartDate ? new Date(body.plannedStartDate) : new Date(),
      plannedEndDate:   body.plannedEndDate   ? new Date(body.plannedEndDate)   : new Date(),
    },
  });

  return NextResponse.json(project, { status: 201 });
}
