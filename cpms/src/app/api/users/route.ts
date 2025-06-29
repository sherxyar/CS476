import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/users?query=ali&limit=20&skip=0
 *
 * - `query`  optional substring to match in name OR email (ASCII-case-insensitive)
 * - `limit`  max rows to return (default 30, hard-capped at 50)
 * - `skip`   how many rows to skip (for simple pagination; default 0)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // ---- query string --------------------------------------------------
  const qRaw  = (searchParams.get("query") ?? "").trim();
  const query = qRaw.length ? qRaw : "";      // avoid falsy-but-not-empty issues

  // ---- limit ---------------------------------------------------------
  const limitParam = Number(searchParams.get("limit"));
  const limit =
    Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(limitParam, 50)               // safety cap
      : 30;                                    // default

  // ---- skip (optional pagination) ------------------------------------
  const skipParam = Number(searchParams.get("skip"));
  const skip =
    Number.isFinite(skipParam) && skipParam >= 0 ? skipParam : 0;

  // ---- DB query ------------------------------------------------------
  const users = await prisma.user.findMany({
    where: query
      ? {
          OR: [
            { name:  { contains: query } },   // LIKE '%query%'  (ASCII CI)
            { email: { contains: query } },
          ],
        }
      : undefined,                            // empty query → no filter
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
    take: limit,
    skip,
  });

  return NextResponse.json(users);
}
