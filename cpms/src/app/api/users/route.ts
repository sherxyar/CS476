import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q     = searchParams.get("query")  ?? "";
  const limit = Number(searchParams.get("limit") ?? 30);

  const users = await prisma.user.findMany({
    where:  { name: { contains: q, mode: "insensitive" } },
    select: { id: true, name: true, email: true },   // keep payload tiny
    orderBy:{ name: "asc" },
    take:   limit,
  });

  return NextResponse.json(users);
}
