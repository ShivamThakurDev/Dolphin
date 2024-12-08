import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

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
  constructor(private taskService: TaskService,private fb:FormBuilder){
    this.taskForm = this.fb.group({
      id:[''],
      name:['',Validators.required],
      description:['',Validators.required],
      status: [''],
      priority: [''],
      progress: ['',Validators.min(0)],
      storyPoint:['',Validators.min(0)],
      startDate:['',Validators.required],
      endDate:['',Validators.required]
    })
  }

  ngOnInit(){
    this.taskService.getTaskList().subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      console.log(err);
    }
  )
  }

  onSubmit():void {
    console.log(this.taskForm.value)
    this.taskService.addTask(this.taskForm.value).subscribe((res:any)=>{
      console.log(res);
    });
  }
}
