// Changelog for Pattern Implementation
export interface ChangeLog {
  projectId: string;
  changeType: string;
  category: string;
  description: string;
  impactArea: string;
  justification: string;
  requestedById: number;
  oldValue?: string;
  newValue?: string;
  approvedById?: number | null;
  status: string;
  priority: string;
  estimatedImpact?: string;
  date?: Date;
}

console.log("TEST works");

export abstract class BaseChangeLog {
  projectId: string;
  changeType: string;
  category: string;
  description: string;
  impactArea: string;
  justification: string;
  requestedById: number;

  // Optional fields - from frontend
  oldValue?: string;
  newValue?: string;
  approvedById?: number | null;
  status: string;
  priority: string;
  estimatedImpact?: string;
  date?: Date;

  constructor(data: ChangeLog) {
    // Required fields
    this.projectId = data.projectId;
    this.changeType = data.changeType;
    this.category = data.category;
    this.description = data.description;
    this.impactArea = data.impactArea;
    this.justification = data.justification;
    this.requestedById = data.requestedById;
    
    // Optional fields - from frontend
    this.oldValue = data.oldValue;
    this.newValue = data.newValue;
    this.approvedById = data.approvedById;
    this.status = data.status || 'Pending';
    this.priority = data.priority || 'Medium';
    this.estimatedImpact = data.estimatedImpact;
    this.date = data.date || new Date();
  }

  // Validation requirements
  isValid(): boolean {
    if (!this.projectId || !this.changeType || !this.description) {
      return false;
    }
    if (!this.impactArea || !this.justification || !this.requestedById) {
      return false;
    }
    return true;
  }

  // Default implementation 
  getImpactLevel(): string {
    if (this.priority === 'Critical') {
      return 'High Impact';
    }
    if (this.priority === 'High') {
      return 'Medium-High Impact';
    }
    if (this.priority === 'Low') {
      return 'Low Impact';
    }
    return 'Medium Impact';
  }

  abstract createNotification(): Promise<void>;
  
  validate(): boolean {
    return this.isValid();
  }
}
