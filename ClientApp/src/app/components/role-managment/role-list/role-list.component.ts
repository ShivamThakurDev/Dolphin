import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../../services/role.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "../../../models/role";
import { MatTableDataSource } from "@angular/material/table";
import { AddEditRoleComponent } from "../add-edit-role/add-edit-role.component";
import { ConfirmDeleteDialogComponent } from "../confirm-delete-dialog/confirm-delete-dialog.component";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  dataSource: any;
  displayedColumns: string[] = ['name', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roleService: RoleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoleList().subscribe({
      next: (res: Role[]) => {
        this.roles = res || [];
        this.dataSource = new MatTableDataSource<Role>(this.roles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => { 
        console.error('Error loading roles:', err);
      }
    });
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  addRole(): void {
    const dialogRef = this.dialog.open(AddEditRoleComponent, {
      width: '460px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }
  
  editRole(role: Role): void {
    const dialogRef = this.dialog.open(AddEditRoleComponent, {
      width: '460px',
      data: role
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }
  
  deleteRole(roleId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '420px',
      data: roleId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Confirmed' || result === true) {
        this.loadRoles();
      }
    });
  }
}
