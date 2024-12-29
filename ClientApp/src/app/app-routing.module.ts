import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-managment/task-list/task-list.component';
import { AddEditTaskComponent } from './components/task-managment/add-edit-task/add-edit-task.component';
import { UserListComponent } from './components/user-managment/user-list/user-list.component';
import { AddEditUserComponent } from './components/user-managment/add-edit-user/add-edit-user.component';
import { RoleListComponent } from './components/role-managment/role-list/role-list.component';
import { AddEditRoleComponent } from './components/role-managment/add-edit-role/add-edit-role.component';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' }, // Default route
  {path: 'task-list',component:TaskListComponent},
  {path:'add-edit-task',component: AddEditTaskComponent},
  {path: 'user-list',component:UserListComponent},
  {path:'add-edit-user',component: AddEditUserComponent},
  {path: 'role-list',component:RoleListComponent},
  {path:'add-edit-role',component: AddEditRoleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
