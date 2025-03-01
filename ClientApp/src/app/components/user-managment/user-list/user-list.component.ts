import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../../models/user";
import { AddEditUserComponent } from "../add-edit-user/add-edit-user.component";
import { ConfirmDialogComponent } from "../../task-managment/confirm-dialog/confirm-dialog.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  userForm: FormGroup;
  dataSource: any;
  displayedColumns: string[] = ['name', 'email', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private roleService: RoleService,
    private dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => (this.users = data),
      error: (err) => console.error('Error fetching users', err)
    });
  }

  loadRoles(): void {
    this.roleService.getRoleList().subscribe({
      next: (data: any) => (this.roles = data),
      error: (err) => console.error('Error fetching roles', err)
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers()
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: User): void {
     
    const dialogRef = this.dialog.open(AddEditUserComponent,{
      width:'400px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
       this.loadRoles();
    });
  }
  
  deleteUser(userId: string): void {
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: userId // Optional data to pass
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('Modal closed:', result);
        this.loadRoles();
      });
  }
}
