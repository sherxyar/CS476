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
