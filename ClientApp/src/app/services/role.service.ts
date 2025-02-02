import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getRoleList(): Observable<any[]> {
    return this.http.get<any[]>(ApiEndpoint.getAllRoles);
  }

  addRole(role:any){
    return this.http.post<any>(ApiEndpoint.addRole,role);
  }

  editRole(id:string,role:any){
    return this.http.put<any>(`${ApiEndpoint.editRole}/${id}`,role);
  }
  deleteRole(id:string){
    return this.http.delete<any>(`${ApiEndpoint.deleteRole}/${id}`)
  }
}
