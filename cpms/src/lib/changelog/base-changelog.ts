/**
 * Base pattern interface for all change log entries
 */
export interface ChangeLog {
  projectId: string;
  changeType: string;
  category: string;
  description: string;
  impactArea: string;
  oldValue?: string;
  newValue?: string;
  justification: string;
  requestedById: number;
  approvedById?: number | null;
  status: string;
  priority: string;
  estimatedImpact?: string;
  date?: Date;
  
  validate(): boolean;
  getImpactLevel(): string;
  createNotification(): Promise<void>;
}

/**
 * Abstract base class that implements the ChangeLog interface
 */
export abstract class BaseChangeLog implements ChangeLog {
  projectId: string;
  changeType: string;
  category: string;
  description: string;
  impactArea: string;
  oldValue?: string;
  newValue?: string;
  justification: string;
  requestedById: number;
  approvedById?: number | null;
  status: string;
  priority: string;
  estimatedImpact?: string;
  date?: Date;

  constructor(data: {
    projectId: string;
    changeType: string;
    category: string;
    description: string;
    impactArea: string;
    oldValue?: string;
    newValue?: string;
    justification: string;
    requestedById: number;
    approvedById?: number | null;
    status: string;
    priority: string;
    estimatedImpact?: string;
    date?: Date;
  }) {
    this.projectId = data.projectId;
    this.changeType = data.changeType;
    this.category = data.category;
    this.description = data.description;
    this.impactArea = data.impactArea;
    this.oldValue = data.oldValue;
    this.newValue = data.newValue;
    this.justification = data.justification;
    this.requestedById = data.requestedById;
    this.approvedById = data.approvedById;
    this.status = data.status;
    this.priority = data.priority;
    this.estimatedImpact = data.estimatedImpact;
    this.date = data.date;
  }

  // Default validation that applies to all change logs
  validate(): boolean {
    return (
      !!this.projectId &&
      !!this.changeType &&
      !!this.category &&
      !!this.description &&
      !!this.impactArea &&
      !!this.justification &&
      !!this.requestedById
    );
  }

  // Default implementation 
  getImpactLevel(): string {
    switch (this.priority) {
      case 'Critical':
        return 'High';
      case 'High':
        return 'Medium-High';
      case 'Medium':
        return 'Medium';
      case 'Low':
        return 'Low';
      default:
        return 'Unknown';
    }
  }

  abstract createNotification(): Promise<void>;
}
