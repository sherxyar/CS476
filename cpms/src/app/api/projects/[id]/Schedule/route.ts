import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { Prisma } from '@prisma/client'; 

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // First, check if project exists
    const project = await prisma.project.findFirst({
      where: { 
        OR: [
          { id: id },
          { projectID: id }
        ]
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Try to find existing schedule
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
    
    return NextResponse.json(schedule);
  } catch (err) {
    console.error(`GET /api/projects/${id}/schedule -`, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}