import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

// GET /api/projects/[id]
export async function GET(req: Request, { params }: Params) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      projectManager: true,
      pmNotesHistory: true,
      financialHistory: true,
    },
  });

  if (!project) {
    return new NextResponse("Project not found", { status: 404 });
  }

  return NextResponse.json(project);
}

// PATCH /api/projects/[id]
export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json();

  const updated = await prisma.project.update({
    where: { id: params.id },
    data: {
      ...body, // Be sure to sanitize in production
      lastUpdated: new Date(),
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/projects/[id]
export async function DELETE(req: Request, { params }: Params) {
  await prisma.project.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
