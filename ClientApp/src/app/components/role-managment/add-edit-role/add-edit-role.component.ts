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
  constructor(private dialogRef: MatDialogRef<AddEditRoleComponent>,private roleService: RoleService,private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Role // Inject the passed data
) {
   console.log(data);
  this.roleForm = this.fb.group({
    id: [data?.id || ''], // Pre-fill form controls with existing data if available
    name: [data?.name || '', Validators.required]
  });
}

  ngOnInit(){
    if (this.data) {
      this.patchFormValues(this.data);
    }
  }
  patchFormValues(role: Role): void {
    this.roleForm.patchValue({
      id: role.id,
      name: role.name
    });
  }
  onSubmit():void {

    if (this.roleForm.valid) {
    if(this.roleForm.value.id ==''){
    this.roleService.addRole(this.roleForm.value).subscribe((res:any)=>{
       console.log(res);
       this.dialogRef.close(this.roleForm.value);
    });
  }
  else{
    this.roleService.editRole(this.roleForm.value.id,this.roleForm.value).subscribe((res:any)=>{
      console.log(res);
      this.dialogRef.close(this.roleForm.value);
   });
  }
  }
  }

  ClosePopup(): void {
    this.dialogRef.close(); // Close the modal without saving
  }
}
