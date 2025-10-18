import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeeklyReport} from '../../model/weekly-report.model';


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
