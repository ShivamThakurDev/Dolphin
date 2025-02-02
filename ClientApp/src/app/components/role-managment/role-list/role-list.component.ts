import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../../services/role.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "../../../models/role";
import { MatTableDataSource } from "@angular/material/table";
import { AddEditRoleComponent } from "../add-edit-role/add-edit-role.component";
import { ConfirmDialogComponent } from "../../helpers/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  dataSource: any;
  displayedColumns: string[]= ['id','name','actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roleService: RoleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoleList().subscribe({
      next: (res: any) => {
         
        this.roles = res;
        this.dataSource = new MatTableDataSource<Role>(this.roles);
         
        this.dataSource.paginator = this.paginator;
         
        this.dataSource.sort = this.sort;
         
      },
      error: (err: any) => { 
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.info('Request completed.');
      }
    });
  }
  
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addRole(): void {
     
    const dialogRef = this.dialog.open(AddEditRoleComponent,{
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadRoles()
    });
  }
  
  editRole(role: Role): void {
     
    const dialogRef = this.dialog.open(AddEditRoleComponent,{
      width:'400px',
      data: role
    });
    dialogRef.afterClosed().subscribe(result => {
       this.loadRoles();
    });
  }
  
  deleteRole(taskId: string): void {
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: taskId // Optional data to pass
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Modal closed:', result);
        this.loadRoles();
      });
  }
  
  
}
