import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoleService } from "../../../services/role.service";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleManagementComponent implements OnInit {
  roles: any[] = [];
  roleForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((data:any) => (this.roles = data));
  }

  addRole() {
    if (this.roleForm.valid) {
      this.roleService.addRole(this.roleForm.value).subscribe(() => {
        this.loadRoles();
        this.roleForm.reset();
      });
    }
  }
}
