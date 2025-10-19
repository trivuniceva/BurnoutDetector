import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseUrl = 'http://localhost:8080/api/manager';

  constructor(private http: HttpClient) {}

  getTeamRiskSummary(risks: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/team-risk-summary`, risks);
  }

}
