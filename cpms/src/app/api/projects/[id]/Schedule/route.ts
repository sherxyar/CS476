import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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