import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/user.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  uploadProfileImage(userId: number, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<User>(`${this.apiUrl}/${userId}/upload-picture`, formData);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  getProfilePictureUrl(profilePic: string | undefined): string {
    if (!profilePic) return '/assets/images/default-profile.png';
    return `http://localhost:8080/api/users/profile-picture/${profilePic}`;
  }

}
