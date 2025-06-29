// app/api/users/[id]/summary/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ── context type ──────────────────────────────────────────────────────
type RouteContext = {
  params: {
    id: string;           // only dynamic segment in this route
  };
};

export async function GET(_req: Request, context: RouteContext) {
  // --- extract & validate id -----------------------------------------
  const id = Number(context.params.id);

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
