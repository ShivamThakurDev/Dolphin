import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TaskListComponent } from './components/task-managment/task-list/task-list.component';
import { AddEditTaskComponent } from './components/task-managment/add-edit-task/add-edit-task.component';
import { UserListComponent } from './components/user-managment/user-list/user-list.component';
import { AddEditUserComponent } from './components/user-managment/add-edit-user/add-edit-user.component';
import { RoleListComponent } from './components/role-managment/role-list/role-list.component';
import { AddEditRoleComponent } from './components/role-managment/add-edit-role/add-edit-role.component';
import { EmployeeDirectoryComponent } from './components/hrms/employee-directory/employee-directory.component';
import { AttendanceComponent } from './components/hrms/attendance/attendance.component';
import { LeaveComponent } from './components/hrms/leave/leave.component';

import { BentoDashboardComponent } from './components/dashboard/bento-dashboard/bento-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: BentoDashboardComponent, canActivate: [AuthGuard] },
  { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'add-edit-task', component: AddEditTaskComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeDirectoryComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'leave', component: LeaveComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'add-edit-user', component: AddEditUserComponent, canActivate: [AuthGuard] },
  { path: 'role-list', component: RoleListComponent, canActivate: [AuthGuard] },
  { path: 'add-edit-role', component: AddEditRoleComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
