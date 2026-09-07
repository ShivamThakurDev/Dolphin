import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../models/user';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  userForm: FormGroup;
  roles: any[] = [];
  isEdit = false;
  userId: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.isEdit = !!data?.id;
    this.userId = data?.id || null;

    this.userForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: [this.isEdit ? '' : 'Dolphin@123', this.isEdit ? [] : [Validators.required]],
      role: [data?.role || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();

    if (this.data && this.data.id) {
      this.userForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        role: this.data.role
      });
    }
  }

  loadRoles(): void {
    this.roleService.getRoleList().subscribe({
      next: (roles: any[]) => {
        this.roles = roles || [];
        if (!this.userForm.value.role && this.roles.length > 0) {
          this.userForm.patchValue({ role: this.roles[0].name });
        }
      },
      error: () => {
        this.snackBar.open('Failed to load roles', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
      return;
    }

    const formData = this.userForm.value;

    if (this.isEdit && this.userId) {
      this.userService.updateUser(this.userId, formData).subscribe({
        next: (res: any) => {
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(res || true);
        },
        error: (error: any) => {
          this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.userService.registerUser(formData).subscribe({
        next: (res: any) => {
          this.snackBar.open('User added successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(res || true);
        },
        error: () => {
          this.snackBar.open('Failed to add user', 'Close', { duration: 3000 });
        }
      });
    }
  }

  ClosePopup(): void {
    this.dialogRef.close();
  }
}
