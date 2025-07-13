import { prisma } from "./prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import type { Session } from "next-auth";

export async function checkProjectAccess(projectId: string): Promise<{
  hasAccess: boolean;
  session: Session | null;
}> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return { hasAccess: false, session: null };
  }

  // Admins and Project Managers have access to all projects
  if (session.user.accountRole === 'ADMIN' || session.user.accountRole === 'PROJECT_MANAGER') {
    return { hasAccess: true, session };
  }

  // For Collaborators, check if they are a member of the project
  if (session.user.accountRole === 'COLLABORATOR') {
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: session.user.id
      }
    });

    return { hasAccess: !!membership, session };
  }

  // Check if user is the project manager of this specific project
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { projectManagerId: true }
  });

  if (project?.projectManagerId === session.user.id) {
    return { hasAccess: true, session };
  }

  return { hasAccess: false, session };
}
