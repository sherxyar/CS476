import { ChangeLog, ChangeLogData } from './base-changelog';
import { 
  FinancialChangeLog, 
  ScheduleChangeLog, 
  ScopeChangeLog, 
  ResourceChangeLog, 
  RiskChangeLog 
} from './changelog-types';

// Pattern Factory for creating change log 
export class ChangeLogFactory {

  static createChangeLog(data: ChangeLogData): ChangeLog {
    switch (data.changeType) {
      case 'Financial':
        return new FinancialChangeLog(data);
      case 'Schedule':
        return new ScheduleChangeLog(data);
      case 'Scope':
        return new ScopeChangeLog(data);
      case 'Resource':
        return new ResourceChangeLog(data);
      case 'Risk':
        return new RiskChangeLog(data);
      default:

      throw new Error(`Invalid change log type: ${data.changeType}`);
    }
  }
}


export class ChangeLogService {

  static async processChangeLog(data: ChangeLogData): Promise<{ valid: boolean; changeLog: ChangeLog | null; error?: string }> {
    try {
      const changeLog = ChangeLogFactory.createChangeLog(data);
      
      // Validate the change log
      const isValid = changeLog.validate();
      
      if (!isValid) {
        return { valid: false, changeLog: null, error: 'Invalid change log data' };
      }
      
      // Send notification
      await changeLog.createNotification();
      
      return { valid: true, changeLog };
    } catch (error) {
      console.error('Error processing change log:', error);
      return { 
        valid: false, 
        changeLog: null, 
        error: error instanceof Error ? error.message : 'Unknown error processing change log'
      };
    }
  }
}
