import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appConstants } from '../../shared/appConstants';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IssueType, Talk } from '../../model/schema.model';
import { text } from 'stream/consumers';
import { MatChipInputEvent } from '@angular/material/chips';
import { ColorPickerDialogComponent } from '../../shared/color-picker-dialog/color-picker-dialog.component';

@Component({
  selector: 'app-edit-talk',
  templateUrl: './edit-talk.component.html',
  styleUrl: './edit-talk.component.css'
})
export class EditTalkComponent implements OnInit{

  formGroup: FormGroup;
  issueTypesArrayWithColor: Object.values(appConstants.issueTypeListWithColor);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {talk: Talk,edit:boolean},
    private dialogRef: MatDialogRef<EditTalkComponent>,
    public fromBuilder: FormBuilder,
    public colorPickerdialog: MatDialog
  ){}

  ngOnInit(): void {
    const talk = this.data && this.data.talk ? this.data.talk: null;
    this.formGroup = this.fromBuilder.group({
      text: [talk && talk.text ? talk.text: '',Validators.required],
      speaker: [talk && talk.speaker ? talk.speaker: '',Validators.required],
      image: [talk && talk.image ? talk.image : ''],
      tags: [talk && talk.tags ? talk.tags : []],
      IssueType: [talk && talk.issueType ? talk.issueType : ''],
      createdAt: [talk && talk.createdAt ? talk.createdAt : new Date()]
    });
  }

  onSubmit(){
    this.dialogRef.close(this.formGroup.value);
  }

  removeTag(tag: string){
    //Remove the tag form the tag control's value
    const tagsControl = this.formGroup.get('tags');
    tagsControl?.value.splice(tagsControl.value.indexOf(tag),1)
  }

  addTag(event: MatChipInputEvent){
    const tagsControl = this.formGroup.get('tags');

    //Create a new array of tags, if the talk deosn't have any,
    //otherwise add the new tag to the existing array.
    if(tagsControl?.value){
      tagsControl.value.push({name: event.value,color: '#e0e0e0'});
    }else{
      tagsControl?.setValue([event.value]);
    }
    //clear the input's value once the tag has been added.
    event.input.value ='';
  }

  openColorPickerDialog(tag: { color: any; }):void {
    const dialogRef = this.colorPickerdialog.open(ColorPickerDialogComponent,{
      //width: '250px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        tag.color = result;
      }
    });
  }
}
