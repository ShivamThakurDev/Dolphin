import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-managment/task-list/task-list.component';
import { AddEditTaskComponent } from './components/task-managment/add-edit-task/add-edit-task.component';
import { UserListComponent } from './components/user-managment/user-list/user-list.component';
import { AddEditUserComponent } from './components/user-managment/add-edit-user/add-edit-user.component';
import { RoleListComponent } from './components/role-managment/role-list/role-list.component';
import { AddEditRoleComponent } from './components/role-managment/add-edit-role/add-edit-role.component';
import { EmployeeDirectoryComponent } from './components/hrms/employee-directory/employee-directory.component';
import { AttendanceComponent } from './components/hrms/attendance/attendance.component';
import { LeaveComponent } from './components/hrms/leave/leave.component';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', component: TaskListComponent },
  { path: 'add-edit-task', component: AddEditTaskComponent },
  { path: 'employees', component: EmployeeDirectoryComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'add-edit-user', component: AddEditUserComponent },
  { path: 'role-list', component: RoleListComponent },
  { path: 'add-edit-role', component: AddEditRoleComponent },
  { path: '**', redirectTo: 'task-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
