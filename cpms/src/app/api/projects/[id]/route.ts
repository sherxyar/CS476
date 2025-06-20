import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

// GET /api/projects/[id]
export async function GET(req: Request, { params }: Params) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      projectManager: true,
      pmNotesHistory: true,
      financialHistory: {
        include: {
          changedBy: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          changedAt: "desc",
        },
      },
    },
  });

  if (!project) {
    return new NextResponse("Project not found", { status: 404 });
  }

  return NextResponse.json(project);
}

// PATCH /api/projects/[id]
export async function PATCH(req: Request, { params }: Params) {
  const { field, newValue, reason, userId } = await req.json();

  // Validate input
  if (!["forecast", "budget", "actuals"].includes(field)) {
    return new NextResponse("Invalid field name", { status: 400 });
  }
  if (typeof newValue !== "number" || isNaN(newValue)) {
    return new NextResponse("Invalid new value", { status: 400 });
  }
  if (!userId || typeof userId !== "number") {
    return new NextResponse("Missing or invalid userId", { status: 400 });
  }

  // Get existing project
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      forecast: true,
      budget: true,
      actuals: true,
    },
  });

  if (!project) {
    return new NextResponse("Project not found", { status: 404 });
  }

  // Safe field usage
  const numericField = field as "forecast" | "budget" | "actuals";
  const oldValue = project[numericField];

  if (oldValue === newValue) {
    return new NextResponse("No changes detected", { status: 200 });
  }

  // Update and log history
  const updated = await prisma.project.update({
    where: { id: params.id },
    data: {
      [numericField]: newValue,
      lastUpdated: new Date(),
      financialHistory: {
        create: {
          field: numericField,
          oldValue,
          newValue,
          reason,
          userId,
        },
      },
    },
    include: {
      financialHistory: {
        include: {
          changedBy: {
            select: { name: true },
          },
        },
        orderBy: {
          changedAt: "desc",
        },
      },
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/projects/[id]
export async function DELETE(req: Request, { params }: Params) {
  await prisma.project.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
