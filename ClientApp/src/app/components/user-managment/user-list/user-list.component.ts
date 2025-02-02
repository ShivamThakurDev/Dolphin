import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  userForm: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private roleService: RoleService
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
    if (this.userForm.valid) {
      const { role, ...user } = this.userForm.value;
      this.userService.registerUser(user).subscribe({
        next: (newUser: any) => {
          this.userService.assignRole({ userId: newUser.id, role }).subscribe({
            next: () => {
              this.loadUsers();
              this.userForm.reset();
            },
            error: (err) => console.error('Error assigning role', err)
          });
        },
        error: (err) => console.error('Error registering user', err)
      });
    }
  }

  editUser(userId: string): void {
    console.log('Edit user logic goes here for user ID:', userId);
  }

  deleteUser(userId: string): void {
   console.log("Delete user logic goes here for user ID:",userId);
  }
}
