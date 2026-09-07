import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../services/role.service';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.css'
})
export class ConfirmDeleteDialogComponent {
  isDeleting = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  onConfirm(): void {
    this.isDeleting = true;
    this.roleService.deleteRole(this.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.dialogRef.close('Confirmed');
      },
      error: (err: any) => {
        this.isDeleting = false;
        console.error('Error deleting role:', err);
        this.dialogRef.close(false);
      }
    });
  }
}
