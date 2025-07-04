import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all milestones for a project
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

    // Find the schedule for this project
    const schedule = await prisma.projectSchedule.findUnique({
      where: { projectId: project.id },
      include: {
        milestones: {
          orderBy: { startDate: "asc" }
        }
      }
    });

    if (!schedule) {
      return NextResponse.json({ milestones: [] });
    }

    return NextResponse.json({ milestones: schedule.milestones });
  } catch (error) {
    console.error("Failed to fetch milestones:", error);
    return NextResponse.json(
      { error: "Failed to fetch milestones" }, 
      { status: 500 }
    );
  }
}

// POST - Create a new milestone
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;
  
  try {
    const { title, description, startDate, endDate, status } = await req.json();

    // Validate required fields
    if (!title || !description || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

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
      where: { projectId: project.id }
    });

    if (!schedule) {
      schedule = await prisma.projectSchedule.create({
        data: { projectId: project.id }
      });
    }

    // Create the milestone
    const milestone = await prisma.milestone.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status || "Not Started",
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

// PATCH - Update milestone status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;
  
  try {
    const { milestoneId, status } = await req.json();

    if (!milestoneId || !status) {
      return NextResponse.json(
        { error: "Missing milestoneId or status" }, 
        { status: 400 }
      );
    }

    // Update the milestone
    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: { status }
    });

    return NextResponse.json(updatedMilestone);
  } catch (error) {
    console.error("Failed to update milestone:", error);
    return NextResponse.json(
      { error: "Failed to update milestone" }, 
      { status: 500 }
    );
  }
}