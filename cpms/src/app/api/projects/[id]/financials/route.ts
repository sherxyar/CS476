// app/api/projects/[id]/financials/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;

  const financials = await prisma.projectFinancials.findUnique({
    where: { projectId },
    include: {
      history: { orderBy: { changedAt: "desc" } },
      invoices: true,
      project: {
        select: { projectID: true, title: true },
      },
    },
  });

  if (!financials) {
    return NextResponse.json(
      { error: `No financials found for project ${projectId}` },
      { status: 404 }
    );
  }

  return NextResponse.json(financials);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  const body = await req.json();
  const { key, value, reason, changedBy = "system" } = body as {
    key: "forecast" | "budget" | "actuals";
    value: number;
    reason: string;
    changedBy?: string;
  };

  // 1) Update the numeric field
  const updatedFin = await prisma.projectFinancials.update({
    where: { projectId },
    data: { [key]: value },
  });

  // 2) Insert a history record
  await prisma.financialHistory.create({
    data: {
      financialsId: updatedFin.id,
      field: key.toUpperCase() as "FORECAST" | "BUDGET" | "ACTUALS",
      oldValue: updatedFin[key],      // note: this is the *new* value again; if you want the prior, you'd have to fetch before update
      newValue: value,
      reason,
      changedBy,
    },
  });

  return NextResponse.json({ success: true, financials: updatedFin });
}
