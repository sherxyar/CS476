import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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

  return NextResponse.json(changeLogs);
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
      { status: 400 },
    );
  }

  const {
    requestedById,
    approvedById,
    date,
    ...rest
  } = parsed.data;

  try {
    const created = await prisma.changeLog.create({
      data: {
        ...rest,
        date: date ? new Date(date) : undefined,
        requestedById,
        approvedById,
        projectId: id, // Use the awaited id
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
      { status: 500 },
    );
  }
}
