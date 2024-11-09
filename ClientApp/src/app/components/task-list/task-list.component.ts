import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

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
  
onSubmit():void {
  console.log(this.taskForm.value)
}
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
}
