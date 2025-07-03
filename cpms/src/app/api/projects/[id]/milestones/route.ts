import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;
  
  try {
    const { title, description, startDate, endDate, status } = await req.json();

    // First, find the project (by id or projectID)
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
      where: { projectId: project.id }
    });

    if (!schedule) {
      schedule = await prisma.projectSchedule.create({
        data: { projectId: project.id }
      });
    }

    // Make sure schedule was created successfully
    if (!schedule || typeof schedule.id === 'undefined') {
      throw new Error('Failed to create or retrieve schedule');
    }

    // Create the milestone
    const milestone = await prisma.milestone.create({
      data: {
        task: title, 
        description: description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status,
        scheduleId: schedule.id
      }
    });

    return NextResponse.json(milestone, { status: 201 });
  } catch (error) {
    console.error("Failed to create milestone:", error);
    return NextResponse.json(
      { error: "Failed to create milestone" }, 
      { status: 500 }
    );
  }
}