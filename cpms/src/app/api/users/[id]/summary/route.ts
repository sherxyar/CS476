import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Record<string, string | string[]> }
) {
  // --- extract & validate id -----------------------------------------
  const raw = Array.isArray(params.id) ? params.id[0] : params.id;
  const id  = Number(raw);

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }

  // --- DB query -------------------------------------------------------
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

  // --- response -------------------------------------------------------
  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
