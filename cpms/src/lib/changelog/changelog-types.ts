import { BaseChangeLog } from './base-changelog';
import { NotificationObserver, NotificationType } from '../notification-observer';

/**
 * Financial Change Log implementation
 */
export class FinancialChangeLog extends BaseChangeLog {
  async createNotification(): Promise<void> {
    const notificationType: NotificationType = 'FINANCIAL_CHANGE';
    const title = `Financial Change: ${this.category}`;
    const message = `${this.description} in ${this.impactArea} area. Priority: ${this.priority}`;

    await NotificationObserver.notifyProjectManager({
      projectId: this.projectId,
      title,
      message,
      type: notificationType,
      triggeredBy: this.requestedById
    });
  }

  // Override base validation with financial-specific checks
  validate(): boolean {
    const baseValid = super.validate();
    
    
    if (!baseValid) return false;
    
    // For financial changes, require both old and new values
    if (this.category === 'Budget' || this.category === 'Forecast' || this.category === 'Actuals') {
      return !!this.oldValue && !!this.newValue;
    }
    
    return true;
  }
}

/**
 * Schedule Change Log implementation
 */
export class ScheduleChangeLog extends BaseChangeLog {
  async createNotification(): Promise<void> {
    const notificationType: NotificationType = 'SCHEDULE_CHANGE';
    const title = `Schedule Change: ${this.category}`;
    const message = `${this.description} affecting ${this.impactArea}. Priority: ${this.priority}`;

    await NotificationObserver.notifyProjectManager({
      projectId: this.projectId,
      title,
      message,
      type: notificationType,
      triggeredBy: this.requestedById
    });
  }
  
  getImpactLevel(): string {
    // For schedule changes, Critical and High priority have higher impact
    if (this.priority === 'Critical') {
      return 'Critical Path Affected';
    } else if (this.priority === 'High') {
      return 'Milestone Delayed';
    }
    
    return super.getImpactLevel();
  }
}

/**
 * Scope Change Log implementation
 */
export class ScopeChangeLog extends BaseChangeLog {
  async createNotification(): Promise<void> {
    const notificationType: NotificationType = 'GENERAL_UPDATE';
    const title = `Scope Change: ${this.category}`;
    const message = `${this.description} changing project scope in ${this.impactArea}. Priority: ${this.priority}`;

    await NotificationObserver.notifyProjectManager({
      projectId: this.projectId,
      title,
      message,
      type: notificationType,
      triggeredBy: this.requestedById
    });
  }
}

/**
 * Resource Change Log implementation
 */
export class ResourceChangeLog extends BaseChangeLog {
  async createNotification(): Promise<void> {
    const notificationType: NotificationType = 'MEMBER_ADDED';
    const title = `Resource Change: ${this.category}`;
    const message = `${this.description} affecting resource allocation in ${this.impactArea}. Priority: ${this.priority}`;

    await NotificationObserver.notifyProjectManager({
      projectId: this.projectId,
      title,
      message,
      type: notificationType,
      triggeredBy: this.requestedById
    });
  }
}

/**
 * Risk Change Log implementation
 */
export class RiskChangeLog extends BaseChangeLog {
  async createNotification(): Promise<void> {
    const notificationType: NotificationType = 'GENERAL_UPDATE';
    const title = `Risk Update: ${this.category}`;
    const message = `${this.description} affecting risk profile in ${this.impactArea}. Priority: ${this.priority}`;

    await NotificationObserver.notifyProjectManager({
      projectId: this.projectId,
      title,
      message,
      type: notificationType,
      triggeredBy: this.requestedById
    });
  }
  
  // Special handling for risk impact levels
  getImpactLevel(): string {
    if (this.priority === 'Critical') {
      return 'Project Threatening';
    } else if (this.priority === 'High') {
      return 'Significant Risk';
    }
    
    return super.getImpactLevel();
  }
}
