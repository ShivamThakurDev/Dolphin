import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';
import { Observable } from 'rxjs';
import { task } from '../models/task';




@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTaskList(): Observable<any[]> {
    return this.http.get<any[]>(ApiEndpoint.getAllTasks);
  }

  addTask(task:any){
    return this.http.post<any>(ApiEndpoint.addTask,task);
  }

  editTask(id:string,task:any){
    return this.http.put<any>(ApiEndpoint.editTask,task);
  }
  deleteTask(id:string){
    return this.http.delete<any>(`${ApiEndpoint.deleteTask}/${id}`)
  }
}
