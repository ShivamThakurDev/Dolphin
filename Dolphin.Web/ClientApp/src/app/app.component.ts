import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board, Talk, Track } from './shared/models/schema.model';
import { BoardService } from './board.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from './edit-talk/edit-talk.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  boards: Board[] = [];

  constructor(private boardService: BoardService,private dialog: MatDialog) {
    this.boards = this.boardService.getBoards();
  }

  onTalkDrop(event:CdkDragDrop<Talk[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  trackIds(boardIndex: number):string []{
    return this.boards[boardIndex].tracks.map(talk => talk.id);
  }

  addEditTalk(talk:Talk|Track, track:Track, isEdit = false){
    const dialogRef = this.dialog.open(EditTalkComponent, {
      width: '400px',
      data: {talk, track, isEdit},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //Handle the result
      }
    })
  }
}
