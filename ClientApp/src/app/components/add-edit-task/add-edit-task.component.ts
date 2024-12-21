import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { task } from '../../models/task';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css'
})
export class AddEditTaskComponent {
  statusList = [
    { label: 'ToDo', value: 0 },
    { label: 'InProgress', value: 1 },
    { label: 'Done', value: 2 },
    {label: 'Closed',value: 3}
  ];

  priorityList = [
    { label: 'Low', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'High', value: 2 }
  ];
  

  public taskForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddEditTaskComponent>,private taskService: TaskService,private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: task // Inject the passed data
) {
   console.log(data);
  this.taskForm = this.fb.group({
    id: [data?.id || ''], // Pre-fill form controls with existing data if available
    name: [data?.name || '', Validators.required],
    description: [data?.description || '', Validators.required],
    status: [data?.status || ''],
    priority: [data?.priority || ''],
    progress: [data?.progress || '', Validators.min(0)],
    storyPoint: [data?.storyPoint || '', Validators.min(0)],
    startDate: [data?.startDate || '', Validators.required],
    endDate: [data?.endDate || '', Validators.required]
  });
}

  ngOnInit(){
    if (this.data) {
      this.patchFormValues(this.data);
    }
  }
  patchFormValues(task: task): void {
    this.taskForm.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      progress: task.progress,
      storyPoint: task.storyPoint,
      startDate: task.startDate,
      endDate: task.endDate
    });
  }
  onSubmit():void {

    if (this.taskForm.valid) {
    if(this.taskForm.value.id ==''){
    this.taskService.addTask(this.taskForm.value).subscribe((res:any)=>{
       console.log(res);
       this.dialogRef.close(this.taskForm.value);
    });
  }else{
    this.taskService.editTask(this.taskForm.value.id,this.taskForm.value).subscribe((res:any)=>{
      console.log(res);
      this.dialogRef.close(this.taskForm.value);
   });
  }
  }
  }

  ClosePopup(): void {
    this.dialogRef.close(); // Close the modal without saving
  }
}
