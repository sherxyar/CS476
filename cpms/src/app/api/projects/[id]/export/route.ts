import { NextResponse, NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { projectToPdf } from '@/lib/pdf/pdf-export';
import { ProjectExportOptions, DEFAULT_EXPORT_OPTIONS } from '@/lib/pdf/export-options';
import { prisma } from '@/lib/prisma';
import type { Project } from '@/types/Project';

type Context = { params: Promise<{ id: string }> };


function parseExportOptions(req: NextRequest): ProjectExportOptions {
  const url = new URL(req.url);
  const options: ProjectExportOptions = { ...DEFAULT_EXPORT_OPTIONS };

  // Sections to include
  if (url.searchParams.has('sections')) {
    const sections = url.searchParams.get('sections')?.split(',') || [];
    
    // Reset all section flags
    options.includeGeneralInfo = false;
    options.includeFinancials = false;
    options.includeSchedule = false;
    options.includeTeam = false;
    options.includeNotes = false;
    options.includeChangeLog = false;

    // Set only user picked sections
    sections.forEach(section => {
      switch (section) {
        case 'general': options.includeGeneralInfo = true; break;
        case 'financials': options.includeFinancials = true; break;
        case 'schedule': options.includeSchedule = true; break;
        case 'team': options.includeTeam = true; break;
        case 'notes': options.includeNotes = true; break;
        case 'changelog': options.includeChangeLog = true; break;
      }
    });
  }

  if (url.searchParams.has('maxFinancial')) {
    options.maxFinancialEntries = parseInt(url.searchParams.get('maxFinancial') || '5', 10);
  }
  
  if (url.searchParams.has('maxNotes')) {
    options.maxNotesEntries = parseInt(url.searchParams.get('maxNotes') || '5', 10);
  }
  
  if (url.searchParams.has('maxChangelog')) {
    options.maxChangeLogEntries = parseInt(url.searchParams.get('maxChangelog') || '5', 10);
  }

  if (url.searchParams.has('header') && url.searchParams.get('header') === 'false') {
    options.includeHeaderFooter = false;
  }
  
  if (url.searchParams.has('timestamp') && url.searchParams.get('timestamp') === 'false') {
    options.includeTimestamp = false;
  }
  
  if (url.searchParams.has('pages') && url.searchParams.get('pages') === 'false') {
    options.includePageNumbers = false;
  }

  if (url.searchParams.has('colorScheme')) {
    const scheme = url.searchParams.get('colorScheme');
    if (scheme === 'modern' || scheme === 'classic' || scheme === 'default') {
      options.colorScheme = scheme;
    }
  }

  return options;
}

export async function GET(
  req: NextRequest,
  { params }: Context
): Promise<NextResponse> {
  const { id } = await params;
  const exportOptions = parseExportOptions(req);

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
      },
      // Add change logs to the query
      changeLogs: {
        include: {
          requestedBy: true,
          approvedBy: true
        },
        orderBy: {
          date: 'desc'
        }
      },
      // Add team members
      members: {
        include: {
          user: true
        }
      },
      schedule: {
        include: {
          milestones: true
        }
      }
    },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  
  // Transform Prisma date objects to ISO strings
  const formattedProject = {
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
    })),
    changeLogs: project.changeLogs?.map(log => ({
      ...log,
      date: log.date.toISOString(),
      createdAt: log.createdAt.toISOString(),
      updatedAt: log.updatedAt.toISOString()
    })) || [],
    members: project.members || [],
    // Format milestones from schedule if present
    milestones: project.schedule?.milestones.map(milestone => ({
      ...milestone,
      startDate: milestone.startDate.toISOString(),
      endDate: milestone.endDate.toISOString()
    })) || []
  } as unknown as Project;

  // Generate filename with more information
  const filename = `project-${formattedProject.projectID}-${formattedProject.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  
  // Generate PDF with configuration options
  const pdf = await renderToBuffer(projectToPdf(formattedProject, exportOptions));

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  });
}
