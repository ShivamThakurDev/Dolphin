import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Talk } from '../../model/schema.model';

@Component({
  selector: 'app-delete-talk',
  templateUrl: './delete-talk.component.html',
  styleUrl: './delete-talk.component.css'
})
export class DeleteTalkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public talk: Talk){
  }

  ngOnInit(){}
}
