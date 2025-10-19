export interface WeeklyReport {
  avgSleepHours: number;
  avgStressLevel: number;
  avgWorkingHours: number;
  riskLevel: string;

  recommendation: string;
  activatedRules: string[];

  employeeId?: number;
  managerNotificationNeeded?: boolean;
  overtimeIncreaseStreak?: number;
  stressIncreaseLast3Weeks?: number;
  totalOvertimeHours?: number;
  weekEnd?: string;
  weekStart?: string;

  recommendations?: { title: string; text: string; riskLevel: string }[];
}
