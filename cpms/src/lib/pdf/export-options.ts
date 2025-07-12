
// will do it after the project submissiom.

export interface ProjectExportOptions {
  // what sections to include
  includeGeneralInfo?: boolean;
  includeFinancials?: boolean;
  includeSchedule?: boolean;
  includeTeam?: boolean;
  includeNotes?: boolean;
  includeChangeLog?: boolean;


  maxFinancialEntries?: number;
  maxNotesEntries?: number;
  maxChangeLogEntries?: number;


  includeHeaderFooter?: boolean;
  includeTimestamp?: boolean;
  includePageNumbers?: boolean;
  colorScheme?: 'default' | 'modern' | 'classic';
  companyLogo?: string;
}

// defaults
export const DEFAULT_EXPORT_OPTIONS: ProjectExportOptions = {
  includeGeneralInfo: true,
  includeFinancials: true,
  includeSchedule: true,
  includeTeam: true,
  includeNotes: true,
  includeChangeLog: true,
  maxFinancialEntries: 5,
  maxNotesEntries: 5,
  maxChangeLogEntries: 5,
  includeHeaderFooter: true,
  includeTimestamp: true,
  includePageNumbers: true,
  colorScheme: 'default'
};
