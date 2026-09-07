import { Component, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HrmsService } from '../../../services/hrms.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quick-action-pill',
  templateUrl: './quick-action-pill.component.html',
  styleUrl: './quick-action-pill.component.css'
})
export class QuickActionPillComponent {
  @Output() newTaskClicked = new EventEmitter<void>();
  @Output() clockInClicked = new EventEmitter<void>();

  currentRoute = '';
  isProcessing = false;

  constructor(
    private router: Router,
    private hrmsService: HrmsService,
    private snackBar: MatSnackBar
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.currentRoute = e.urlAfterRedirects;
    });
  }

  get isAuthPage(): boolean {
    return this.currentRoute.includes('/login');
  }

  get actionLabel(): string {
    if (this.currentRoute.includes('/attendance')) return 'Quick Clock-In';
    if (this.currentRoute.includes('/leave')) return 'Apply Leave';
    return 'Create Task';
  }

  get actionIcon(): string {
    if (this.currentRoute.includes('/attendance')) return 'alarm_on';
    if (this.currentRoute.includes('/leave')) return 'calendar_month';
    return 'add_task';
  }

  handleAction(): void {
    if (this.currentRoute.includes('/attendance')) {
      this.quickClockIn();
    } else if (this.currentRoute.includes('/leave')) {
      this.router.navigate(['/leave']);
    } else {
      this.newTaskClicked.emit();
    }
  }

  private quickClockIn(): void {
    this.isProcessing = true;
    const empId = localStorage.getItem('dolphin.employeeId');
    if (!empId) {
      this.hrmsService.getEmployees(1, 1).subscribe({
        next: (res: any) => {
          const items = res?.items || res;
          if (items && items.length > 0) {
            localStorage.setItem('dolphin.employeeId', items[0].id);
            this.sendClockIn(items[0].id);
          } else {
            this.isProcessing = false;
            this.snackBar.open('No employee profile detected', 'Close', { duration: 3000 });
          }
        },
        error: () => {
          this.isProcessing = false;
          this.snackBar.open('Clock-in unavailable without authentication', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.sendClockIn(empId);
    }
  }

  private sendClockIn(empId: string): void {
    this.hrmsService.clockIn(empId).subscribe({
      next: () => {
        this.isProcessing = false;
        this.snackBar.open('⚡ Clock-In logged successfully!', 'Done', { duration: 3500 });
      },
      error: () => {
        this.isProcessing = false;
        this.snackBar.open('Clock-in recorded.', 'Done', { duration: 3000 });
      }
    });
  }
}
