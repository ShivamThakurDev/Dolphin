import { environment } from "../../../environments/environment.development";

export class ApiEndpoint  {

 public static readonly getAllTasks = `${environment.baseUrl}Task/GetAll`; 
 public static readonly addTask = `${environment.baseUrl}Task/Add`;
 public static readonly editTask = `${environment.baseUrl}Task/Edit`;
 public static readonly deleteTask = `${environment.baseUrl}Task/Delete`;
}