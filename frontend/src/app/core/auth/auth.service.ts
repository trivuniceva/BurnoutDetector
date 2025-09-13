import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.saveUser(response);

        this.router.navigate(['/profile']);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }


  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }


}
