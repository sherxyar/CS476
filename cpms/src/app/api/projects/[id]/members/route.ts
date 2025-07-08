// app/api/projects/[id]/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ROLES = ["ADMIN", "PROJECT_MANAGER", "CONTRIBUTOR"] as const;
type DbRole = typeof ROLES[number];

// Get all members
export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {

  const projectId = (await context.params).id;

  const memberships = await prisma.projectMember.findMany({
    where: { projectId },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(
    memberships.map((m) => ({
      id: m.id,
      name: m.user.name,
      email: m.user.email,
      department: m.user.department ?? "",
      lastActivity: m.user.lastActivity ?? "",
      role: m.role as DbRole,
    }))
  );
}

// Post member
export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const projectId = (await context.params).id;
  const { userId, role } = await req.json();

  if (!userId || !ROLES.includes(role)) {
    return NextResponse.json(
      { error: "userId and valid role required" },
      { status: 400 }
    );
  }

  try {
    const membership = await prisma.projectMember.create({
      data: { projectId, userId, role },
      include: { user: true },
    });

    return NextResponse.json(
      {
        id: membership.id,
        name: membership.user.name,
        email: membership.user.email,
        department: membership.user.department ?? "",
        lastActivity: membership.user.lastActivity ?? "",
        role: membership.role,
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "User already on project" },
        { status: 409 }
      );
    }
    console.error("POST members error", err);
    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}

// preventing 405
export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
