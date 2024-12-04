import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { task } from '../../models/task';
import { first } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent{
  taskList: task[] =[];
constructor(private taskService: TaskService){

}

ngOnInit(){
  this.taskService.getTaskList().pipe(first()).subscribe((data:any)=>{
    console.log(data)
    this.taskList = data;
  },(err)=>{
    console.log(err);
  })
}

}
