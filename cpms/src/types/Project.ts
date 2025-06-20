/* types/Project.ts */
export interface ProjectManagerLite {
  id: number;
  name: string;
  email: string;
}

export interface ProjectFinancialsLite {
  forecast: number;
  budget: number;
  actuals: number;
}

export interface Project {
  id: string;
  projectID: string;
  title: string;
  phase: string;
  projectManager: ProjectManagerLite | null;
  plannedStartDate: string | null;
  plannedEndDate: string | null;
  dateCreated: string;
  lastUpdated: string ;
  description: string;
  financials: ProjectFinancialsLite | null;   // ← new nested object
}
