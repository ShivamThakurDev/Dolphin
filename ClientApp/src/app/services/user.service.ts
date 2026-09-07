import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(ApiEndpoint.getAllUsers).pipe(
      map(res => res?.data || (Array.isArray(res) ? res : []))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<any>(`${ApiEndpoint.users}/${id}`).pipe(
      map(res => res?.data || res)
    );
  }

  registerUser(user: any): Observable<User> {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password || 'Dolphin@123',
      role: user.role
    };
    return this.http.post<any>(ApiEndpoint.registerUser, payload).pipe(
      map(res => res?.data || res)
    );
  }

  updateUser(id: string, user: any): Observable<User> {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role
    };
    return this.http.put<any>(`${ApiEndpoint.users}/${id}`, payload).pipe(
      map(res => res?.data || res)
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${ApiEndpoint.users}/${id}`).pipe(
      map(res => res?.data ?? res)
    );
  }

  assignRole(userId: string, roleId: string): Observable<any> {
    return this.http.post<any>(ApiEndpoint.assignRole, { userId, roleId }).pipe(
      map(res => res?.data ?? res)
    );
  }
}
