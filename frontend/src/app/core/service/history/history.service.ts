import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DailyRecordDto {
  id: number;
  date: string;
  dailyFactors: { name: string; value: string; unit: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = "http://localhost:8080/api/daily-data";

  constructor(private http: HttpClient) { }

  getReports(employeeId: number): Observable<DailyRecordDto[]> {
    return this.http.get<DailyRecordDto[]>(`${this.apiUrl}/${employeeId}`);
  }
}
