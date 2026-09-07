import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { AuthInterceptor } from './services/auth.interceptor';

// Task Management
import { TaskListComponent } from './components/task-managment/task-list/task-list.component';
import { AddEditTaskComponent } from './components/task-managment/add-edit-task/add-edit-task.component';
import { ConfirmDialogComponent } from './components/task-managment/confirm-dialog/confirm-dialog.component';

// User & Role Management
import { UserListComponent } from './components/user-managment/user-list/user-list.component';
import { AddEditUserComponent } from './components/user-managment/add-edit-user/add-edit-user.component';
import { RoleListComponent } from './components/role-managment/role-list/role-list.component';
import { AddEditRoleComponent } from './components/role-managment/add-edit-role/add-edit-role.component';
import { ConfirmDeleteDialogComponent } from './components/role-managment/confirm-delete-dialog/confirm-delete-dialog.component';

// HRMS Core
import { EmployeeDirectoryComponent } from './components/hrms/employee-directory/employee-directory.component';
import { AttendanceComponent } from './components/hrms/attendance/attendance.component';
import { LeaveComponent } from './components/hrms/leave/leave.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddEditTaskComponent,
    ConfirmDialogComponent,
    UserListComponent,
    AddEditUserComponent,
    AddEditRoleComponent,
    RoleListComponent,
    ConfirmDeleteDialogComponent,
    EmployeeDirectoryComponent,
    AttendanceComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
