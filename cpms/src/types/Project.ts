export type Project = {
  id: string;
  projectID: string;
  title: string;
  phase: string;
   projectManager: {
      id: number;
      name: string;
      email: string;
    } | null;
  dateCreated?: string;
  lastUpdated?: string;
  status?: string;
  description?: string;
  pmNotes?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
};