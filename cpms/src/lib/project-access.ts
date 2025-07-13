import { prisma } from "./prisma";
import { getServerSession } from "./auth-session";

export async function checkProjectAccess(projectId: string): Promise<{
  hasAccess: boolean;
  session: { id: number; email: string; role: string } | null;
}> {
  const session = await getServerSession();
  
  if (!session) {
    return { hasAccess: false, session: null };
  }

  // Admins and Project Managers have access to all projects
  if (session.role === 'ADMIN' || session.role === 'PROJECT_MANAGER') {
    return { hasAccess: true, session };
  }

  // For Collaborators, check if they are a member of the project
  if (session.role === 'COLLABORATOR') {
    const membership = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: session.id
      }
    });

    return { hasAccess: !!membership, session };
  }

  // Check if user is the project manager of this specific project
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { projectManagerId: true }
  });

  if (project?.projectManagerId === session.id) {
    return { hasAccess: true, session };
  }

  return { hasAccess: false, session };
}
