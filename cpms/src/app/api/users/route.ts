import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // text filter
  const qRaw = (searchParams.get("query") ?? "").trim();
  const query = qRaw.length ? qRaw : "";

  // pagination
  const limit = Math.min(
    parseInt(searchParams.get("limit") ?? "30", 10) || 30,
    50
  );
  const skip = parseInt(searchParams.get("skip") ?? "0", 10) || 0;

  // DB read
  const users = await prisma.user.findMany({
    where: query
      ? {
          OR: [
            { name:  { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
    take: limit,
    skip,
  });

  return NextResponse.json(users);
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
