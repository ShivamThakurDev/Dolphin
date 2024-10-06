import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { appConstants } from '../../shared/appConstants';
import { IssueType } from '../../model/schema.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  
  issueTypesWithColor = appConstants.issueTypeListWithColor;
  issueTypes = Object.values(IssueType);
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() text : string ='';
  @Input() author: string = '';
  @Input() tags: { name: string; color?: string }[] = [];
  @Input() image: string ='';
  @Input() issueType: IssueType = IssueType.Task;
  @Input() createdAt: Date | undefined;

  constructor(){}
  ngOnInit(){}
}
