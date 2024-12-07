import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { task } from '../../models/task';
import { first } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent{
  taskList: task[] =[];
  dataSource: any;
  //columns to be displayed 
  displayedColumns: string[] = ['id','name','description','status','priority','progress','story point','start date','end date']


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService){

}

ngOnInit() {

  this.taskService.getTaskList().subscribe({
    next: (res: any) => {
      console.log('Response:', res);
      this.taskList = res;
      this.dataSource = new MatTableDataSource<task>(this.taskList);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.paginator)
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.sort);
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


}
