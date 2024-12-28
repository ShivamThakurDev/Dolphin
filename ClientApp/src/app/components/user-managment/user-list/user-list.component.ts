import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService) {
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

  loadUsers() {
    this.userService.getUsers().subscribe((data:any) => (this.users = data));
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((data:any) => (this.roles = data));
  }

  addUser() {
    if (this.userForm.valid) {
      const { role, ...user } = this.userForm.value;
      this.userService.registerUser(user).subscribe(newUser => {
        this.userService.assignRole({newUser.id, role}).subscribe(() => {
          this.loadUsers();
          this.userForm.reset();
        });
      });
    }
  }
}
