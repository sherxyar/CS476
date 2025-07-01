import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

// GET /api/projects/[id]/financials
export async function GET(req: Request, { params }: Params) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    select: {
      forecast: true,
      budget: true,
      actuals: true,
      financialHistory: {
        include: {
          changedBy: {
            select: { name: true },
          },
        },
        orderBy: { changedAt: "desc" },
      },
    },
  });

  if (!project) {
    return new NextResponse("Project not found", { status: 404 });
  }

  return NextResponse.json(project);
}
