import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);


  const limit = Math.min(Number(searchParams.get("limit")) || 30, 50); 
  const skip  = Number(searchParams.get("skip"))  || 0;                

  // PMs only
  const queryStr = (searchParams.get("query") || "").trim();
  const managersOnly =
    searchParams.get("managersOnly") === "true" ||         
    searchParams.get("role") === "PM";                    

  const where: Prisma.UserWhereInput = {
    ...(managersOnly && {
      accountRole: { in: ["PROJECT_MANAGER", "ADMIN"] },
    }),
    ...(queryStr && {
      OR: [
        { name:  { contains: queryStr, mode: "insensitive" } },
        { email: { contains: queryStr, mode: "insensitive" } },
      ],
    }),
  };

  const users = await prisma.user.findMany({
    where,
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
