import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ChangeSchema = z.object({
  date: z.string().datetime(),
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
  description: z.string(),
  impactArea: z.string(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  justification: z.string(),
  requestedBy: z.string(),
  approvedBy: z.string().nullable().optional(),
  status: z.enum(["Pending", "Approved", "Rejected", "Implemented"]),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  estimatedImpact: z.string().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const changes = await prisma.changeLog.findMany({
    where: { projectId: params.id },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(changes);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = ChangeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const created = await prisma.changeLog.create({
    data: { ...parsed.data, projectId: params.id },
  });
  return NextResponse.json(created, { status: 201 });
}
