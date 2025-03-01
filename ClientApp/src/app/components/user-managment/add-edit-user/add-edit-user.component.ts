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
  isEdit: boolean = false; // Determines if we're editing or adding
  userId: string | null = null; // Holds the ID of the user being edited

  constructor(
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User // Inject the passed data,
  ) {
    // Initialize the form
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load roles for the dropdown
    this.loadRoles();

    // Check if editing an existing user
    this.route.params.subscribe((params) => {
      this.userId = params['id']; // Assuming route is like /users/edit/:id
      if (this.userId) {
        this.isEdit = true;
        this.loadUserData(this.userId);
      }
    });
  }

  // Fetch roles from the server
  loadRoles(): void {
    this.roleService.getRoleList().subscribe(
      (roles:any) => {
        this.roles = roles;
      },
      (error) => {
        this.snackBar.open('Failed to load roles', 'Close', { duration: 3000 });
      }
    );
  }

  // Fetch user data if editing
  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (user:any) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          role: user.role.id // Assuming role object contains an 'id' field
        });
      },
      (error:any) => {
        this.snackBar.open('Failed to load user data', 'Close', { duration: 3000 });
      }
    );
  }

  // Handle form submission
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
      return;
    }

    const formData = this.userForm.value;

    if (this.isEdit && this.userId) {
      // Update user
      this.userService.updateUser(this.userId, formData).subscribe(
        () => {
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        },
        (error:any) => {
          this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
        }
      );
    } else {
      // Add new user
      this.userService.registerUser(formData).subscribe(
        () => {
          this.snackBar.open('User added successfully', 'Close', { duration: 3000 });
          this.userForm.reset(); // Clear the form after adding
        },
        (error) => {
          this.snackBar.open('Failed to add user', 'Close', { duration: 3000 });
        }
      );
    }
  }

  
  ClosePopup(): void {
    this.dialogRef.close(); // Close the modal without saving
  }
}
