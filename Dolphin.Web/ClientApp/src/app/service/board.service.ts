import { Injectable } from '@angular/core';
import { Board } from '../model/schema.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _boards: any[] = [];

  constructor(private http: HttpClient) {}

  getBoards():any {
    this.http.get<any[]>('assets/data.json').subscribe((data) => {
      this._boards = data;
    });
  }
}