import { environment } from "../../../environments/environment.development";

export class ApiEndpoint  {

 public static readonly getAllTasks = `${environment.baseUrl}Task/GetAll`; 
 public static readonly addTask = `${environment.baseUrl}Task/Add`;
 public static readonly editTask = `${environment.baseUrl}Task/Edit`;
 public static readonly deleteTask = `${environment.baseUrl}Task/Delete`;

 public static readonly getAllUsers = `${environment.baseUrl}Users/GetAll`; 
 public static readonly assignRole = `${environment.baseUrl}Users/AssignRole`;
 public static readonly registerUser = `${environment.baseUrl}Users/Register`;

 public static readonly getRoles = `${environment.baseUrl}Roles/GetRoles`; 
 public static readonly addRole = `${environment.baseUrl}Roles/AddRole`;
}