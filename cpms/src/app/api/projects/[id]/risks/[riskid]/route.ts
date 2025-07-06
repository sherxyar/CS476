import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; riskid: string } }
) {
  const riskId = parseInt(params.riskid, 10);
  const data = await req.json();

  try {
    const updatedRisk = await prisma.riskRegister.update({
      where: { id: riskId },
      data,
    });
    return NextResponse.json(updatedRisk);

  } catch (err) {
    console.error(`Error updating risk ${riskId}:`, err);
    return NextResponse.json(
      { error: "Failed to update risk" },
      { status: 500 }
    );
  }
}
