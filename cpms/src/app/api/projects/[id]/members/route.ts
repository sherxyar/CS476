// app/api/projects/[id]/members/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ROLES = ["ADMIN", "PROJECT_MANAGER", "CONTRIBUTOR"] as const;
type DbRole = typeof ROLES[number];


interface AddMemberPayload {
  userId: number;
  role: DbRole;
}

function isAddMemberPayload(data: unknown): data is AddMemberPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "userId" in data &&
    typeof (data as { userId: unknown }).userId === "number" &&
    "role" in data &&
    ROLES.includes((data as { role: unknown }).role as DbRole)
  );
}

// GET reuqest

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const projectId = context.params.id;

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

// Post Request

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const projectId = context.params.id;
  const body: unknown = await req.json();

  if (!isAddMemberPayload(body)) {
    return NextResponse.json(
      { error: "userId (number) and valid role required" },
      { status: 400 }
    );
  }

  const { userId, role } = body;

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
        role: membership.role as DbRole,
      },
      { status: 201 }
    );
  } catch (err: unknown) {

    // no double same member
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
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


export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
