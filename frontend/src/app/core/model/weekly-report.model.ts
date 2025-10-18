export interface WeeklyReport {
  avgSleepHours: number;
  avgStressLevel: number;
  avgWorkingHours: number;
  riskLevel: string; // sada je string ("Nizak", "Srednji", "Visok")
  recommendations?: { title: string; text: string; riskLevel: string }[];
}
