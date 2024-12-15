import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { task } from '../../models/task';
import { first } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent{
  taskList: task[] =[];
  dataSource: any;
  //columns to be displayed 
  displayedColumns: string[] = ['id','name','description','status','priority','progress','story point','start date','end date','actions']


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService,private dialog:MatDialog){}



ngOnInit() {

  this.taskService.getTaskList().subscribe({
    next: (res: any) => {
       
      this.taskList = res;
      this.dataSource = new MatTableDataSource<task>(this.taskList);
       
      this.dataSource.paginator = this.paginator;
       
      this.dataSource.sort = this.sort;
       
    },
    error: (err: any) => { 
      console.error('Error occurred:', err);
    },
    complete: () => {
      console.info('Request completed.');
    }
  });
}

ngAfterViewInit(){
 

}

applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
addTask(): void {
   
  const dialogRef = this.dialog.open(AddEditTaskComponent,{
    width:'800px'
  });
  dialogRef.afterClosed().subscribe(result => {
  });
}

editTask(task: task): void {
   
  const dialogRef = this.dialog.open(AddEditTaskComponent,{
    width:'800px',
    data: task
  });
  dialogRef.afterClosed().subscribe(result => {
     
  });
}

deleteTask(id: string): void {
   debugger
  this.taskService.deleteTask(id).subscribe((res:any)=>{
    console.log(res);
  })
}

}
