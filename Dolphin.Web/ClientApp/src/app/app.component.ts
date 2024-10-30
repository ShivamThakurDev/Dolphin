import { Component } from '@angular/core';
import { Board, Talk, Track } from './model/schema.model';
import { BoardService } from './service/board.service';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { EditTalkComponent } from './component/edit-talk/edit-talk.component';
import { DeleteTalkComponent } from './component/delete-talk/delete-talk.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClientApp';
  boards: Board[] = [];
  constructor(private _boardService:BoardService, private _dialog:MatDialog){
    this.boards = this._boardService.getBoards();
  }
/** 
 * An array of all track ids. Each id is associated with a `cdkDropList` for the 
 * track talks. This property can be used to connect all drop lists together.
**/
  trackIds(boardIndex:any):string[]{
    return this.boards[boardIndex].tracks.map(track => track.id);
  }
  
  onTalkDrop(event:CdkDragDrop<Talk[]>){
     // In case the destination container is different from the previous container, we
    // need to transfer the given talk to the target data array. This happens if
    // a talk has been dropped on a different track.
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else{
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>){
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addEditTalk(talk: Talk, track: Track, edit=false){
    //Use the injected dialog service to launch the previously created edit-talk
    //component. Once the dialog closes, we assign the updated talk data to
    //the specified talk.
    this._dialog.open(EditTalkComponent, {data: {talk,edit}, width:'500px'})
    .afterClosed()
    .subscribe(newTalkData => edit ? Object.assign(talk,newTalkData): track.talks.unshift(newTalkData));
  }

  deleteTalk(talk: Talk, track: Track){
    //Open a dialog
    this._dialog.open(DeleteTalkComponent,{data:talk,width:'500px'})
    .afterClosed()
    .subscribe(response =>{
      //Wait for it to close and delete the talk if the user agreed.
    
      if(response){
        track.talks.splice(track.talks.indexOf(talk),1);
      }
    });
  }

  filterByDate(talks: any[],asc=1){
    talks= [...talks.sort((a:any,b:any)=>(asc)*(new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime()))];
  }
}
