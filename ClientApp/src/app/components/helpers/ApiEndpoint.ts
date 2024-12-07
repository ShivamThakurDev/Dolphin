import { environment } from "../../../environments/environment.development";

export class ApiEndpoint  {

 public static readonly getAllTasks = `${environment.baseUrl}Task/GetAll`; 
 public static readonly addTask = `${environment.baseUrl}Task/Add`;
}