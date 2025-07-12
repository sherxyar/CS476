import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Fetch complete schedule with milestones
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;

  try {
    // Find the project
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          { id: projectId },
          { projectID: projectId }
        ]
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Find or create the schedule for this project
    let schedule = await prisma.projectSchedule.findUnique({
      where: { projectId: project.id },
      include: {
        milestones: {
          orderBy: { startDate: "asc" }
        }
      }
    });

    // If no schedule exists, create one
    if (!schedule) {
      schedule = await prisma.projectSchedule.create({
        data: {
          projectId: project.id
        },
        include: {
          milestones: {
            orderBy: { startDate: "asc" }
          }
        }
      });
    }

    return NextResponse.json({
      id: schedule.id,
      projectId: schedule.projectId,
      milestones: schedule.milestones
    });
  } catch (error) {
    console.error(`GET /api/projects/${projectId}/schedule -`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT - Update schedule milestones
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
    const { milestones } = await request.json();

    // Update schedule milestones
    await prisma.projectSchedule.update({
      where: { projectId },
      data: { milestones }
    });

    // Create notification for all project members
    const projectMembers = await prisma.projectMember.findMany({
      where: { projectId }
    });

    // Create notifications for all team members except the user who made the change
    for (const member of projectMembers) {
      if (member.userId !== session.user.id) {
        await prisma.notification.create({
          data: {
            type: "MILESTONE_UPDATE",
            title: "Schedule Updated",
            message: "Project schedule has been updated with new milestones",
            userId: member.userId,
            projectId,
            triggeredBy: session.user.id
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}