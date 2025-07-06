import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

interface Params { id: string; }

const RiskSchema = z.object({
  riskName: z.string().min(1),
  riskDescription: z.string().optional(),
  riskOwner: z.string().optional(),
  currentImpact: z.number().int().min(1).max(5),
  currentLikelihood: z.number().int().min(1).max(5),
});

type CreateRiskPayload = z.infer<typeof RiskSchema>;

// GET all risks
export async function GET(
  _req: Request,
  { params }: { params: Params }
) {
  const risks = await prisma.riskRegister.findMany({
    where: { projectId: params.id },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(risks);
}

// post a new risk
export async function POST(
  req: Request,
  { params }: { params: Params }
) {
  const body: CreateRiskPayload = RiskSchema.parse(await req.json());

  const risk = await prisma.riskRegister.create({
    data: { ...body, projectId: params.id },
  });

  return NextResponse.json(risk, { status: 201 });
}
