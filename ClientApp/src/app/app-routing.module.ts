import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-managment/task-list/task-list.component';
import { AddEditTaskComponent } from './components/task-managment/add-edit-task/add-edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' }, // Default route
  {path: 'task-list',component:TaskListComponent},
  {path:'add-edit-task',component: AddEditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
