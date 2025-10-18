import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BurnoutRisk} from '../../model/burnout-risk.model';

@Injectable({
  providedIn: 'root'
})
export class DailyDataService {
  private apiUrl = 'http://localhost:8080/api/daily-data';

  constructor(private http: HttpClient) { }

  processDailyReport(dailyReportData: { date: string; dailyFactors: { name: string; value: any }[]; employeeId: number }): Observable<BurnoutRisk> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<BurnoutRisk>(this.apiUrl, dailyReportData, httpOptions);
  }

  getDailyReport(employeeId: number, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${employeeId}/${date}`);
  }

}
