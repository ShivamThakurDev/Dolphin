import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private crudService:CrudService) { }

  getRoles(){
    return this.crudService.get(ApiEndpoint.getRoles);
  }

  addRole(params:any){
    return this.crudService.post(ApiEndpoint.addRole,params)
  }
  deleteRole(id:string){
    return this.crudService.delete(ApiEndpoint.addRole);
  }
}
