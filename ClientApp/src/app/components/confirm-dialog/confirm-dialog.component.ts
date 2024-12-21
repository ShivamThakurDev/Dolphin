import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, private taskService: TaskService ,@Inject(MAT_DIALOG_DATA) public id: taskId) {}

  onConfirm(): void {
    this.taskService.deleteTask(this.id).subscribe((res:any)=>{
      console.log(res);
    })
    this.dialogRef.close('Confirmed'); // Pass data back to the parent
  }
}
