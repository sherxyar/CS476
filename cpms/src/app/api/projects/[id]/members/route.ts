import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// THIS FILE IS NOT PROPERLY DEVELOPED YET


const ROLES = ["ADMIN", "PROJECT_MANAGER", "CONTRIBUTOR"] as const;
type DbRole = (typeof ROLES)[number];

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id: projectId } = await params;          

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

// Add member
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = params.id;
    const { userId, role } = await request.json();

    if (!isAddMemberPayload({ userId, role })) {
      return NextResponse.json(
        { error: "userId (number) and valid role required" },
        { status: 400 }
      );
    }

    // Add member logic here...
    try {
      const membership = await prisma.projectMember.create({
        data: { projectId, userId, role },
        include: { user: true },
      });

      // Get project and user details for the notification
      const [project, addedUser] = await Promise.all([
        prisma.project.findUnique({ where: { id: projectId } }),
        prisma.user.findUnique({ where: { id: userId } })
      ]);

      if (!project || !addedUser) {
        return NextResponse.json({ error: 'Project or user not found' }, { status: 404 });
      }

      // Create notifications for all existing team members
      const existingMembers = await prisma.projectMember.findMany({
        where: { projectId }
      });

      for (const member of existingMembers) {
        if (member.userId !== session.user.id) {
          await prisma.notification.create({
            data: {
              type: 'MEMBER_ADDED',
              title: 'Team Member Added',
              message: `${addedUser.name} has been added to the project team`,
              userId: member.userId,
              projectId,
              triggeredBy: session.user.id
            }
          });
        }
      }

      // Also notify the added user
      await prisma.notification.create({
        data: {
          type: 'MEMBER_ADDED',
          title: 'Project Assignment',
          message: `You have been added to project: ${project.title}`,
          userId,
          projectId,
          triggeredBy: session.user.id
        }
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
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json(
      { error: 'Failed to add team member' }, 
      { status: 500 }
    );
  }
}

// Remove member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = params.id;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get user and project info before deletion
    const [user, project] = await Promise.all([
      prisma.user.findUnique({ where: { id: parseInt(userId) } }),
      prisma.project.findUnique({ where: { id: projectId } })
    ]);

    if (!user || !project) {
      return NextResponse.json({ error: 'User or project not found' }, { status: 404 });
    }



    // Notify remaining team members
    const remainingMembers = await prisma.projectMember.findMany({
      where: { projectId }
    });

    for (const member of remainingMembers) {
      if (member.userId !== session.user.id) {
        await prisma.notification.create({
          data: {
            type: 'MEMBER_REMOVED',
            title: 'Team Member Removed',
            message: `${user.name} has been removed from the project team`,
            userId: member.userId,
            projectId,
            triggeredBy: session.user.id
          }
        });
      }
    }

    // Notify the removed user
    await prisma.notification.create({
      data: {
        type: 'MEMBER_REMOVED',
        title: 'Project Removal',
        message: `You have been removed from project: ${project.title}`,
        userId: parseInt(userId),
        projectId,
        triggeredBy: session.user.id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing team member:', error);
    return NextResponse.json(
      { error: 'Failed to remove team member' }, 
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
