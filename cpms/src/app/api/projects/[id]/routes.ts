import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const { status } = await req.json();

    // Update the milestone status
    const updatedMilestone = await prisma.milestone.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    return NextResponse.json(updatedMilestone);
  } catch (error) {
    console.error("Failed to update milestone status:", error);
    return NextResponse.json(
      { error: "Failed to update milestone status" }, 
      { status: 500 }
    );
  }
}