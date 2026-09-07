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
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  roles: any[] = [];
  dataSource: any;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService, 
    private roleService: RoleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data || [];
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error('Error fetching users', err)
    });
  }

  loadRoles(): void {
    this.roleService.getRoleList().subscribe({
      next: (data: any) => (this.roles = data || []),
      error: (err) => console.error('Error fetching roles', err)
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '460px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '460px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }
  
  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => console.error('Error deleting user', err)
      });
    }
  }
}
