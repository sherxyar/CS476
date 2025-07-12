import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { NotificationObserver } from "@/lib/notification-observer";
import { ChangeLogService, ChangeLogFactory } from "@/lib/changelog";

// Validation schema remains the same
const ChangeSchema = z.object({
  date: z.string().datetime().optional(),

  changeType: z.enum(["Financial", "Schedule", "Scope", "Resource", "Risk"]),
  category: z.enum([
    "Budget",
    "Forecast",
    "Actuals",
    "Timeline",
    "Milestone",
    "Deliverable",
    "Other",
  ]),

  description: z.string().trim(),
  impactArea: z.string().trim(),

  oldValue: z.string().trim().optional(),
  newValue: z.string().trim().optional(),
  justification: z.string().trim(),

  requestedById: z.number().int().positive(),
  approvedById: z.number().int().positive().nullable().optional(),

  status: z.enum(["Pending", "Approved", "Rejected", "Implemented"]).default("Pending"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium"),

  estimatedImpact: z.string().trim().optional(),
});

// FACTORY PATTERN - Helper function to transform database model to domain model
function adaptChangeLog(data: any) {
  return {
    id: data.id,
    projectId: data.projectId,
    changeType: data.changeType,
    category: data.category,
    description: data.description,
    impactArea: data.impactArea,
    oldValue: data.oldValue,
    newValue: data.newValue,
    justification: data.justification,
    requestedById: data.requestedById,
    approvedById: data.approvedById,
    status: data.status,
    priority: data.priority,
    estimatedImpact: data.estimatedImpact,
    date: data.date,
    requestedBy: data.requestedBy,
    approvedBy: data.approvedBy,
    impactLevel: getImpactLevel(data),
  };
}

function getImpactLevel(data: any) {
  try {
    const changeLog = ChangeLogFactory.createChangeLog({
      projectId: data.projectId,
      changeType: data.changeType,
      category: data.category,
      description: data.description,
      impactArea: data.impactArea,
      oldValue: data.oldValue,
      newValue: data.newValue,
      justification: data.justification,
      requestedById: data.requestedById,
      approvedById: data.approvedById,
      status: data.status,
      priority: data.priority,
      estimatedImpact: data.estimatedImpact,
      date: data.date,
    });

    return changeLog.getImpactLevel();
  } catch (error) {
    console.error("Error calculating impact level:", error);
    return "Unknown";
  }
}

// GET
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const changeLogs = await prisma.changeLog.findMany({
    where: { projectId: id },
    orderBy: { date: "desc" },
    include: {
      requestedBy: { select: { id: true, name: true, email: true } },
      approvedBy: { select: { id: true, name: true, email: true } },
    },
  });

  // Transform each change log to include impact level
  const enrichedChangeLogs = changeLogs.map(adaptChangeLog);

  return NextResponse.json(enrichedChangeLogs);
}

// POST
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = ChangeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { requestedById, approvedById, date, ...rest } = parsed.data;

  try {
    // Process the change log using our factory
    const result = await ChangeLogService.processChangeLog({
      ...rest,
      projectId: id,
      date: date ? new Date(date) : undefined,
      requestedById,
      approvedById,
    });

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || "Invalid change log data" },
        { status: 400 }
      );
    }

    // Create the database record
    const created = await prisma.changeLog.create({
      data: {
        ...rest,
        date: date ? new Date(date) : undefined,
        requestedById,
        approvedById,
        projectId: id, 
      },
      include: {
        requestedBy: { select: { id: true, name: true, email: true } },
        approvedBy: { select: { id: true, name: true, email: true } },
      },
    });


    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("Error creating ChangeLog:", err);
    return NextResponse.json(
      { error: "Failed to create ChangeLog entry." },
      { status: 500 }
    );
  }
}
