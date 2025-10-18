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

  getWeeklyReport(userId: number): Observable<WeeklyReport> {
    return this.http.get<WeeklyReport>(`${this.apiUrl}/${userId}`);
  }

}
