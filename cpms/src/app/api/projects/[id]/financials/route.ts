import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NotificationObserver } from "@/lib/notification-observer";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    console.time("fetchFinancials");
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
    console.timeEnd("fetchFinancials");
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { budget, actualCost } = await request.json();

    await prisma.project.update({
      where: { id: projectId },
      data: {
        budget,
        actuals: actualCost,
        lastUpdated: new Date(),
      },
    });

    // Get project info for notification content
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        budget: true,
        actuals: true
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Determine what field was updated for the notification
    const fieldUpdated = budget ? 'budget' : 'actual cost';
    const newValue = budget || actualCost;
    const oldValue = budget ? project.budget : project.actuals;

    // Use NotificationObserver for financial changes
    await NotificationObserver.notifyFinancialChange(
      projectId,
      fieldUpdated,
      oldValue || 0,
      newValue,
      session.user.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating financials:", error);
    return NextResponse.json(
      { error: "Failed to update financials" },
      { status: 500 }
    );
  }
}
