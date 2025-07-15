import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkProjectAccess } from '@/lib/project-access';
import { NotificationObserver } from '@/lib/notification-observer';

// THIS FILE IS NOT PROPERLY DEVELOPED YET


const ROLES = ["ADMIN", "PROJECT_MANAGER", "COLLABORATOR"] as const;
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    
    // Check if user has access to this project (only admins/PMs can add members)
    const { hasAccess, session } = await checkProjectAccess(projectId);
    
    if (!hasAccess || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    // Only admins and project managers can add members
    if (session.user.accountRole === 'COLLABORATOR') {
      return NextResponse.json({ error: 'Only admins and project managers can add members' }, { status: 403 });
    }

    const { userId, role } = await request.json();

    if (!isAddMemberPayload({ userId, role })) {
      return NextResponse.json(
        { error: "userId (number) and valid role required" },
        { status: 400 }
      );
    }

    try {
      if (userId === session.user.id) {
        return NextResponse.json({ error: "You cannot change your own role" }, { status: 403 });
      }
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

      // Notify team members about the new member using NotificationObserver
      await NotificationObserver.notifyMemberChange(
        projectId,
        'added',
        addedUser.name,
        session.user.id
      );

      // Direct notification to the added user
      await NotificationObserver.notifyUserDirectly(
        userId,
        projectId,
        'Project Assignment',
        `You have been added to project: ${project.title}`,
        'MEMBER_ADDED',
        session.user.id
      );

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    
    // Check if user has access to this project (only admins/PMs can remove members)
    const { hasAccess, session } = await checkProjectAccess(projectId);
    
    if (!hasAccess || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins and project managers can remove members
    if (session.user.accountRole === 'COLLABORATOR') {
      return NextResponse.json({ error: 'Only admins and project managers can remove members' }, { status: 403 });
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    if (parseInt(userId) === session.user.id && session.user.accountRole === "PROJECT_MANAGER") {
      return NextResponse.json({ error: "Project Managers cannot remove themselves from a project" }, { status: 403 });
    }

    // Get user and project info before deletion
    const [user, project] = await Promise.all([
      prisma.user.findUnique({ where: { id: parseInt(userId) } }),
      prisma.project.findUnique({ where: { id: projectId } })
    ]);

    if (!user || !project) {
      return NextResponse.json({ error: 'User or project not found' }, { status: 404 });
    }

    // Remove the member
    await prisma.projectMember.deleteMany({
      where: {
        projectId,
        userId: parseInt(userId)
      }
    });

    // Notify team members about the removed member using NotificationObserver
    await NotificationObserver.notifyMemberChange(
      projectId,
      'removed',
      user.name,
      session.user.id
    );

    // Direct notification to the removed user
    await NotificationObserver.notifyUserDirectly(
      parseInt(userId),
      projectId,
      'Project Removal',
      `You have been removed from project: ${project.title}`,
      'MEMBER_REMOVED',
      session.user.id
    );

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
