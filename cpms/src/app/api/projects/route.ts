import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const userId = 1;

  const newProject = await prisma.project.create({
    data: {
      name: body.name,
    },
  });

  await logAudit({
    userId,
    action: 'create',
    tableName: 'Project',
    recordId: newProject.id,
    afterData: newProject,
  });

  return NextResponse.json(newProject, { status: 201 });
}
