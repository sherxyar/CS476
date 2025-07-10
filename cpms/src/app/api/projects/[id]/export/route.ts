import { NextResponse }    from 'next/server';
import { renderToBuffer }  from '@react-pdf/renderer';
import { projectToPdf }    from '@/lib/pdf/proPDFexport';
import { prisma }          from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      projectManager: true,
    },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const pdf = await renderToBuffer(projectToPdf(project as any));

  return new NextResponse(pdf, {
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': `inline; filename="project-${id}.pdf"`,
    },
  });
}
