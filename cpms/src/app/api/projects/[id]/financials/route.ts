import { prisma as prisma2 } from "@/lib/prisma";
import { NextResponse as NextResponse2 } from "next/server";

type Context2 = { params: { id: string } };

export async function GET(_: Request, context: Context2) {
  const { id } = await context.params;

  try {
    const project = await prisma2.project.findUnique({
      where: { id },
      select: {
        forecast: true,
        budget: true,
        actuals: true,
        financialHistory: {
          include: {
            changedBy: { select: { id: true, name: true, email: true } },
          },
          orderBy: { changedAt: "desc" },
        },
      },
    });

    if (!project) {
      return NextResponse2.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse2.json(project);
  } catch (err) {
    console.error(`GET /api/projects/${id}/financials error:`, err);
    return new NextResponse2("Internal Server Error", { status: 500 });
  }
}
