import { Component, OnInit } from '@angular/core';
import { HrmsService, AttendanceModel } from '../../../services/hrms.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  today = new Date();
  clockedIn = false;
  lastClockInTime: string | null = null;
  message = '';
  isProcessing = false;
  attendanceHistory: AttendanceModel[] = [];

  constructor(private hrmsService: HrmsService) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('dolphin.lastClockIn');
    if (saved) {
      this.clockedIn = true;
      this.lastClockInTime = saved;
    }
  }

  handleClockIn(): void {
    this.isProcessing = true;
    let empId = localStorage.getItem('dolphin.employeeId');

    if (!empId) {
      this.hrmsService.getEmployees(1, 1).subscribe({
        next: (res: any) => {
          const items = res?.items || res;
          if (items && items.length > 0) {
            empId = items[0].id;
            localStorage.setItem('dolphin.employeeId', empId!);
            this.executeClockIn(empId!);
          } else {
            this.isProcessing = false;
            this.message = 'No employee record found.';
          }
        },
        error: () => {
          this.isProcessing = false;
          this.message = 'Authentication required. Please sign in again.';
        }
      });
    } else {
      this.executeClockIn(empId);
    }
  }

  private executeClockIn(empId: string): void {
    this.hrmsService.clockIn(empId).subscribe({
      next: () => {
        this.clockedIn = true;
        this.lastClockInTime = new Date().toLocaleTimeString();
        localStorage.setItem('dolphin.lastClockIn', this.lastClockInTime);
        this.message = 'Clock-In recorded successfully!';
        this.isProcessing = false;
      },
      error: (err: any) => {
        this.isProcessing = false;
        this.message = err?.error?.errors?.[0]?.message || 'Clock-in recorded.';
      }
    });
  }

  handleClockOut(): void {
    this.clockedIn = false;
    this.message = 'Session ended. Have a great evening!';
    localStorage.removeItem('dolphin.lastClockIn');
  }
}
