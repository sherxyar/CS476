import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { Prisma } from '@prisma/client'; 

// list projects - GET request

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { dateCreated: "desc" },
      select: {
        id: true,
        projectID: true,
        title: true,
        status: true,
        phase: true,
        dateCreated: true,
        lastUpdated: true,
        description: true,
        plannedStartDate: true,
        plannedEndDate: true,
        forecast: true,
        actuals: true,
        budget: true,
        projectManagerId: true,
        projectManager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        pmNotesHistory: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            note: true,
            createdAt: true,
            userId: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        financialHistory: {
          orderBy: { changedAt: "desc" },
          select: {
            id: true,
            field: true,
            oldValue: true,
            newValue: true,
            reason: true,
            changedAt: true,
            userId: true,
            changedBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


// create a new project - POST reuquest
export async function POST(req: Request) {
  const body = await req.json()

  if (!body.title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  const pmId =
    body.projectManagerId !== undefined && body.projectManagerId !== null
      ? Number(body.projectManagerId)
      : null
  if (pmId !== null && Number.isNaN(pmId)) {
    return NextResponse.json(
      { error: 'projectManagerId must be a number' },
      { status: 400 }
    )
  }

  try {
    const project = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const year = new Date().getFullYear()
      const countThisYear = await tx.project.count({
        where: { dateCreated: { gte: new Date(`${year}-01-01T00:00:00Z`) } },
      })

      const projectID = `${year}-${String(countThisYear + 1).padStart(4, '0')}`

      return tx.project.create({
        data: {
          projectID,
          title: body.title,
          description: body.description ?? '',
          phase: body.phase ?? 'Planning',
          projectManager: pmId !== null ? { connect: { id: pmId } } : undefined,
          forecast: Number(body.forecast) || 0,
          actuals: Number(body.actuals) || 0,
          budget: Number(body.budget) || 0,
          plannedStartDate: new Date(body.plannedStartDate),
          plannedEndDate: new Date(body.plannedEndDate),
        },
        select: {
          id: true,
          projectID: true,
          title: true,
          phase: true,
          dateCreated: true,
          lastUpdated: true,
          status: true,
          description: true,
          plannedStartDate: true,
          plannedEndDate: true,
          forecast: true,
          actuals: true,
          budget: true,
          projectManagerId: true,
          projectManager: { select: { id: true, name: true, email: true } },
          pmNotesHistory: true,
          financialHistory: true,
        },
      })
    })

    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    console.error('Failed to create project:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
