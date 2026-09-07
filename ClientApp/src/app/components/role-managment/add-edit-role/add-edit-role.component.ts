import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrl: './add-edit-role.component.css'
})
export class AddEditRoleComponent {  

  public roleForm: FormGroup;
  isEdit = false;

  constructor(
    private dialogRef: MatDialogRef<AddEditRoleComponent>,
    private roleService: RoleService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Role
  ) {
    this.isEdit = !!data?.id;
    this.roleForm = this.fb.group({
      id: [data?.id || ''],
      name: [data?.name || '', Validators.required],
      description: [data?.description || '']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.patchFormValues(this.data);
    }
  }

  patchFormValues(role: Role): void {
    this.roleForm.patchValue({
      id: role.id,
      name: role.name,
      description: role.description || ''
    });
  }

  onSubmit(): void {
    if (this.roleForm.invalid) return;

    const val = this.roleForm.value;
    if (!val.id) {
      this.roleService.addRole(val).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res || val);
        },
        error: (err: any) => console.error('Failed to add role', err)
      });
    } else {
      this.roleService.editRole(val.id, val).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res || val);
        },
        error: (err: any) => console.error('Failed to edit role', err)
      });
    }
  }

  ClosePopup(): void {
    this.dialogRef.close(); // Close the modal without saving
  }
}
