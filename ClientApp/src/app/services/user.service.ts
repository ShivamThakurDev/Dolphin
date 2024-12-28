import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private crudService: CrudService) { }

  getUsers(){
    return this.crudService.get(ApiEndpoint.getAllUsers);
  }

  assignRole(params:any){
    return this.crudService.post(ApiEndpoint.assignRole,params);
  }

  registerUser(params:any){
    return this.crudService.post(ApiEndpoint.registerUser,params);
  }
}
