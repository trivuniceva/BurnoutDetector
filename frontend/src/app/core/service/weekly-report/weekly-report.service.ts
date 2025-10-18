import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface WeeklyReport {
  sleep: number;
  avgStressLevel: number;
  avgWorkingHours: number;
  riskLevel: number; // 0-1
  recommendations: { title: string; text: string; riskLevel: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class WeeklyReportService {
  private apiUrl = 'http://localhost:8080/api/weekly-reports';

  constructor(private http: HttpClient) {}

  getWeeklyReport(employeeId: number, start: Date, end: Date): Observable<WeeklyReport> {
    const params = `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
    return this.http.get<WeeklyReport>(`${this.apiUrl}/weekly/${employeeId}${params}`);
  }

}
