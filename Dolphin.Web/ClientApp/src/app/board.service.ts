import { Injectable } from '@angular/core';
import { Board } from './shared/models/schema.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _boards: Board[] = [{
    id: '1',
    title: 'My First Board',
    tracks: [
      {
        id: 'track1',
        title: 'To Do',
        talks: []
      },
      {
        id: 'track2',
        title: 'In Progress',
        talks: []
      },
      {
        id: 'track3',
        title: 'Done',
        talks: []
      }
    ]
  }];

  getBoards(): Board[] {
    return this._boards;
  }
}