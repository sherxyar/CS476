import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//  /api/projects/[id]/financials  (GET)
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        forecast: true,
        budget:   true,
        actuals:  true,
        financialHistory: {
          include: {
            changedBy: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { changedAt: "desc" }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);              // 200 OK
  } catch (err) {
    console.error(`GET /api/projects/${id}/financials –`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
