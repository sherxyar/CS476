import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
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
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project); 
  } catch (err) {
    console.error(`GET /api/projects/${id}/financials -`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projectId = params.id;
    const { budget, actualCost } = await request.json();

    await prisma.project.update({
      where: { id: projectId },
      data: {
        budget,
        actuals: actualCost,
        lastUpdated: new Date(),
      },
    });

    // Create notifications for financial changes
    const projectMembers = await prisma.projectMember.findMany({
      where: { projectId },
    });

    // Get project info for notification content
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const message = budget
      ? `The budget for this project has been updated to $${budget.toLocaleString()}`
      : `The actual cost for this project has been updated to $${actualCost.toLocaleString()}`;

    // Notify all team members except the user who made the change
    for (const member of projectMembers) {
      if (member.userId !== session.user.id) {
        await prisma.notification.create({
          data: {
            type: "FINANCIAL_CHANGE",
            title: "Financial Update",
            message,
            userId: member.userId,
            projectId,
            triggeredBy: session.user.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating financials:", error);
    return NextResponse.json(
      { error: "Failed to update financials" },
      { status: 500 }
    );
  }
}
