import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (!Number.isInteger(id))
    return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      _count: { select: { projects: true } },
      auditLogs: {
        orderBy: { timestamp: "desc" },
        take: 10,
        select: { action: true, tableName: true, timestamp: true },
      },
    },
  });

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
