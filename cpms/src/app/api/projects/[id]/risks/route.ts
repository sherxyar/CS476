import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  projectId: string;
}

// get all risks for a project
export async function GET(
  _req: Request,
  { params }: { params: Params }
) {
  const risks = await prisma.riskRegister.findMany({
    where: { projectId: params.projectId },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(risks);
}

// create a new risk item
export async function POST(
  req: Request,
  { params }: { params: Params }
) {
  const data = await req.json();
  const risk = await prisma.riskRegister.create({
    data: { ...data, projectId: params.projectId },
  });
  return NextResponse.json(risk, { status: 201 });
}
