import { Component } from '@angular/core';
import { BoardService } from '../../service/board.service';
import { Board } from '../../model/schema.model';
import { BreakpointObserver,Breakpoints } from "@angular/cdk/layout";
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {
  boards: Board[];
  isHandset$: Observable<boolean>;
  constructor(private breakpointObserver:BreakpointObserver,private boardService:BoardService){
    this.boards = boardService.getBoards();
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map((result: { matches: any; }) => result.matches));
  }

 
}
