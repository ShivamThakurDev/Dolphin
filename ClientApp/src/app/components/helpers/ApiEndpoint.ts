import { environment } from "../../../environments/environment.development";

export class ApiEndpoint  {

 public static readonly getAllTasks = `${environment.baseUrl}Task/GetAll`; 
 public static readonly addTask = `${environment.baseUrl}Task/Add`;
 public static readonly editTask = `${environment.baseUrl}Task/Edit`;
 public static readonly deleteTask = `${environment.baseUrl}Task/Delete`;

 public static readonly getAllUsers = `${environment.baseUrl}User/GetAll`; 
 public static readonly assignRole = `${environment.baseUrl}User/AssignRole`;
 public static readonly registerUser = `${environment.baseUrl}User/Register`;

 public static readonly getAllRoles = `${environment.baseUrl}Role/GetAll`; 
 public static readonly addRole = `${environment.baseUrl}Role/Add`;
 public static readonly editRole = `${environment.baseUrl}Role/Edit`;
 public static readonly deleteRole = `${environment.baseUrl}Role/Delete`;
}