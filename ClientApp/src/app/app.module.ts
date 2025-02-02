import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-managment/task-list/task-list.component';
import { MaterialModule } from './shared/material/material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditTaskComponent } from './components/task-managment/add-edit-task/add-edit-task.component';
import { ConfirmDialogComponent } from './components/helpers/confirm-dialog/confirm-dialog.component';
import { AddEditUserComponent } from './components/user-managment/add-edit-user/add-edit-user.component';
import { AddEditRoleComponent } from './components/role-managment/add-edit-role/add-edit-role.component';
import { UserListComponent } from './components/user-managment/user-list/user-list.component';
import { RoleListComponent } from './components/role-managment/role-list/role-list.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
