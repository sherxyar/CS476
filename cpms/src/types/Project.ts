export type Project = {
  id: string;
  projectID: string;
  title: string;
  phase: string;
  description: string;
  forecast: number;
  actuals: number;
  budget: number;
  plannedStartDate: string;
  plannedEndDate: string;
  dateCreated: string;
  lastUpdated?: string;
  status?: string;
  pmNotesHistory: PMNote[];
  financialHistory: FinancialHistoryEntry[];
  projectManagerId?: number;
  projectManager?: {
    id: number;
    name: string;
    email: string;
  } | null;
  // Adding these for exporte
  changeLogs?: ChangeLog[];
  members?: TeamMember[];
  milestones?: Milestone[];
  schedule?: ProjectSchedule;
};

export type PMNote = {
  id: number;
  note: string;
  createdAt: string;
  projectId: string;
  userId?: number;
  author?: {
    id: number;
    name: string;
    email: string;
  };
};

export type FinancialHistoryEntry = {
  id: number;
  projectId: string;
  field: "forecast" | "budget" | "actuals";
  oldValue: number;
  newValue: number;
  reason?: string;
  changedAt: string;
  userId?: number;
  changedBy?: {
    id: number;
    name: string;
    email: string;
  };
};

// PDF Export Types - For all the needed parts
export type ChangeLog = {
  id: string;
  projectId: string;
  date: string;
  changeType: string;
  category: string;
  description: string;
  impactArea: string;
  oldValue?: string;
  newValue?: string;
  justification: string;
  status: string;
  priority: string;
  estimatedImpact?: string;
  requestedById: number;
  approvedById?: number;
  createdAt: string;
  updatedAt: string;
  requestedBy?: {
    id: number;
    name: string;
    email: string;
  };
  approvedBy?: {
    id: number;
    name: string;
    email: string;
  };
};

export type TeamMember = {
  id: string;
  projectId: string;
  userId: number;
  role: string;
  joinedAt?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
};

export type Milestone = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  scheduleId: number;
};

export type ProjectSchedule = {
  id: number;
  projectId: string;
  milestones: Milestone[];
};
