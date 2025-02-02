import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public http:HttpClient) { }

  get(url:string, reqOpts?: any){
    return this.http.get(this.getBaseUrl(url),reqOpts);
  }

  post(url:string, body: any, reqOpts?: any){
    return this.http.post(this.getBaseUrl(url),body,reqOpts).pipe(catchError(this.handleError))
  }

  put(url:string, body:any, reqOpts?:any){
    return this.http.put(this.getBaseUrl(url),body,reqOpts);
  }

  delete(url:string, reqOpts?: any){
    return this.http.delete(this.getBaseUrl(url),reqOpts);
  }

  private getBaseUrl(url:string):string{
    return `${environment.baseUrl}${url}`;
  }
  
  handleError(error:HttpErrorResponse){
    return throwError(error);
  }
}
