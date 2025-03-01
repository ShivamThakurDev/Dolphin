import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../services/role.service';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.css'
})
export class ConfirmDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>, private roleService: RoleService ,@Inject(MAT_DIALOG_DATA) public id: string) {}

  onConfirm(): void {
    this.roleService.deleteRole(this.id).subscribe((res:any)=>{
      console.log(res);
    })
    this.dialogRef.close('Confirmed'); // Pass data back to the parent
  }
}
