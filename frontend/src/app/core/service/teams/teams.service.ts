import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private baseUrl = 'http://localhost:8080/api';
  private teamApiUrl = `${this.baseUrl}/teams`;
  private userApiUrl = `${this.baseUrl}/users`;

  constructor(private http: HttpClient) { }

  addTeam(teamData: FormData, managerId: number): Observable<any> {
    return this.http.post(`${this.teamApiUrl}?managerId=${managerId}`, teamData);
  }

  addEmployee(employeeData: FormData): Observable<any> {
    return this.http.post(`${this.userApiUrl}/upload`, employeeData);
  }

  getAllTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.teamApiUrl);
  }

  getTeamById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.teamApiUrl}/${id}`);
  }
}
