import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getRoleList(): Observable<Role[]> {
    return this.http.get<any>(ApiEndpoint.getAllRoles).pipe(
      map(res => res?.data || (Array.isArray(res) ? res : []))
    );
  }

  addRole(role: any): Observable<Role> {
    const payload = {
      name: role.name,
      description: role.description || ''
    };
    return this.http.post<any>(ApiEndpoint.addRole, payload).pipe(
      map(res => res?.data || res)
    );
  }

  editRole(id: string, role: any): Observable<Role> {
    const payload = {
      name: role.name,
      description: role.description || ''
    };
    return this.http.put<any>(`${ApiEndpoint.editRole}/${id}`, payload).pipe(
      map(res => res?.data || res)
    );
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete<any>(`${ApiEndpoint.deleteRole}/${id}`).pipe(
      map(res => res?.data ?? res)
    );
  }
}
