import { prisma } from './prisma';

// Define the notification types
export type NotificationType = 
  | 'PROJECT_UPDATE'
  | 'FINANCIAL_CHANGE'
  | 'SCHEDULE_CHANGE'
  | 'MILESTONE_UPDATE'
  | 'MEMBER_ADDED'
  | 'MEMBER_REMOVED'
  | 'CHANGE_LOG_CREATED'
  | 'GENERAL_UPDATE';

export interface NotificationData {
  projectId: string;
  title: string;
  message: string;
  type: NotificationType;
  triggeredBy?: number;
}

export class NotificationObserver {

  // Main function - sends notification to everyone on the project team
  static async notifyProjectManager(data: NotificationData): Promise<void> {
    try {
      // Get the project and its team members
      const project = await prisma.project.findUnique({
        where: { id: data.projectId },
        select: { 
          projectManagerId: true,
          title: true,
          members: {
            select: {
              userId: true
            }
          }
        }
      });

      if (!project) {
        console.log(`Project not found: ${data.projectId}`);
        return;
      }

      // Get all team members
      const memberIds = project.members?.map(member => member.userId) || [];
      
      // Make sure the project manager gets notified too
      if (project.projectManagerId && !memberIds.includes(project.projectManagerId)) {
        memberIds.push(project.projectManagerId);
      }

      if (memberIds.length === 0) {
        console.log(`No team members found for project ${data.projectId}`);
        return;
      }

      for (const userId of memberIds) {
        if (data.triggeredBy === userId) {
          continue;
        }

        // Create notification using Prisma client
        await prisma.notification.create({
          data: {
            userId,
            projectId: data.projectId,
            title: data.title,
            message: data.message,
            type: data.type, 
            triggeredBy: data.triggeredBy,
            isRead: false
          }
        });
      }

      console.log(`Notifications created for team members of project: ${project.title}`);
    } catch (error) {
      console.error('Failed to create notifications:', error);
    }
  }

  // General changes notifications
  static async notifyProjectUpdate(
    projectId: string, 
    changes: {
      title?: string;
      description?: string;
      phase?: string;
      projectManagerId?: number | null;
    }, 
    triggeredBy?: number
  ): Promise<void> {
    const changeDescriptions: string[] = [];
    
    if (changes.title) changeDescriptions.push(`Title changed to "${changes.title}"`);
    if (changes.description) changeDescriptions.push('Description updated');
    if (changes.phase) changeDescriptions.push(`Phase changed to "${changes.phase}"`);
    if (changes.projectManagerId !== undefined) {
      if (changes.projectManagerId === null) {
        changeDescriptions.push('Project manager unassigned');
      } else {
        const newManager = await prisma.user.findUnique({
          where: { id: changes.projectManagerId },
          select: { name: true }
        });
        changeDescriptions.push(`Project manager assigned to ${newManager?.name || 'Unknown'}`);
      }
    }

    if (changeDescriptions.length === 0) return;

    await this.notifyProjectManager({
      projectId,
      title: 'Project Updated',
      message: changeDescriptions.join(', '),
      type: 'PROJECT_UPDATE',
      triggeredBy
    });
  }

  /**
   * Notify when financial data changes
   */
  static async notifyFinancialChange(
    projectId: string,
    field: string,
    oldValue: number,
    newValue: number,
    triggeredBy?: number
  ): Promise<void> {
    await this.notifyProjectManager({
      projectId,
      title: 'Financial Update',
      message: `${field} changed from ${oldValue} to ${newValue}`,
      type: 'FINANCIAL_CHANGE',
      triggeredBy
    });
  }

  // Project milestones get added, updated, or deleted
  static async notifyMilestoneUpdate(
    projectId: string,
    action: 'created' | 'updated' | 'deleted',
    milestoneName: string,
    triggeredBy?: number
  ): Promise<void> {
    await this.notifyProjectManager({
      projectId,
      title: 'Milestone Update',
      message: `Milestone "${milestoneName}" was ${action}`,
      type: 'MILESTONE_UPDATE',
      triggeredBy
    });
  }

  // Someone joins or leaves the project team
  static async notifyMemberChange(
    projectId: string,
    action: 'added' | 'removed',
    memberName: string,
    triggeredBy?: number
  ): Promise<void> {
    await this.notifyProjectManager({
      projectId,
      title: 'Team Update',
      message: `${memberName} was ${action} ${action === 'added' ? 'to' : 'from'} the project`,
      type: action === 'added' ? 'MEMBER_ADDED' : 'MEMBER_REMOVED',
      triggeredBy
    });
  }

  // New change request submitted
  static async notifyChangeLogCreated(
    projectId: string,
    changeDescription: string,
    triggeredBy?: number
  ): Promise<void> {
    await this.notifyProjectManager({
      projectId,
      title: 'Change Request',
      message: `New change request: ${changeDescription}`,
      type: 'CHANGE_LOG_CREATED',
      triggeredBy
    });
  }

  // Check how many unread notifications a user has
  static async getUnreadCount(userId: number): Promise<number> {
    const count = await prisma.notification.count({
      where: {
        userId: userId,
        isRead: false
      }
    });

    return count;
  }

  // Mark specific notifications as read when user clicks on them
  static async markAsRead(notificationIds: string[]): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds
        }
      },
      data: {
        isRead: true
      }
    });
  }

  // Bulk action - mark everything as read for this user
  static async markAllAsRead(userId: number): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        userId: userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });
  }

  // Send notification to just one person (bypasses team lookup)
  static async notifyUserDirectly(
    userId: number,
    projectId: string,
    title: string,
    message: string,
    type: NotificationType,
    triggeredBy?: number
  ): Promise<void> {
    try {
      await prisma.notification.create({
        data: {
          userId,
          projectId,
          title,
          message,
          type,
          triggeredBy,
          isRead: false
        }
      });
      
      console.log(`Direct notification sent to user ${userId}`);
    } catch (error) {
      console.error('Failed to send direct notification:', error);
    }
  }
}
