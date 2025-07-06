import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  riskId: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: Params }
) {
  const id = Number(params.riskId);
  const data = await req.json();
  const risk = await prisma.riskRegister.update({ where: { id }, data });
  return NextResponse.json(risk);
}
