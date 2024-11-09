import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTaskList(): Observable<any> {
    return this.http.get<any>(ApiEndpoint.getAllTasks);
  }
}
