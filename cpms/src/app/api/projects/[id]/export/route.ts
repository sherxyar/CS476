import { NextResponse, NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { projectToPdf } from '@/lib/pdf/proPDFexport';
import { prisma } from '@/lib/prisma';
import type { Project } from '@/types/Project';

type Context = { params: Promise<{ id: string }> };

export async function GET(
  _req: NextRequest,
  { params }: Context
): Promise<NextResponse> {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      projectManager: true,
      pmNotesHistory: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      financialHistory: {
        include: {
          changedBy: true
        },
        orderBy: {
          changedAt: 'desc'
        }
      }
    },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  
  // Transform Prisma date objects to ISO strings to match our Project type
  const formattedProject: Project = {
    ...project,
    dateCreated: project.dateCreated.toISOString(),
    plannedStartDate: project.plannedStartDate.toISOString(),
    plannedEndDate: project.plannedEndDate.toISOString(),
    lastUpdated: project.lastUpdated ? project.lastUpdated.toISOString() : undefined,
    pmNotesHistory: project.pmNotesHistory.map(note => ({
      ...note,
      createdAt: note.createdAt.toISOString()
    })),
    financialHistory: project.financialHistory.map(entry => ({
      ...entry,
      changedAt: entry.changedAt.toISOString()
    }))
  } as Project;

  const pdf = await renderToBuffer(projectToPdf(formattedProject));

  return new NextResponse(pdf, {
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': `inline; filename="project-${id}.pdf"`,
    },
  });
}
