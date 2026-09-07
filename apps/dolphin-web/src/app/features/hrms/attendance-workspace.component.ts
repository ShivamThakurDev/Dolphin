import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { EnterpriseDataTableComponent } from '../../shared/enterprise-data-table.component';
import { StatusPillComponent } from '../../shared/status-pill.component';
import { HrmsDemoDataService } from './hrms-demo-data.service';

@Component({
  selector: 'app-attendance-workspace',
  standalone: true,
  imports: [CommonModule, AppIconComponent, EnterpriseDataTableComponent, StatusPillComponent],
  template: `
    <section class="hrms-page">
      <header class="workspace-head">
        <div>
          <p class="eyebrow">Attendance</p>
          <h1 class="page-title">Attendance command desk</h1>
          <p class="body-small">Track timings, remote days, exceptions and regularization signals in one operational view.</p>
        </div>
        <div class="head-actions">
          <button class="btn btn-light btn-sm" type="button">Work from home</button>
          <button class="btn btn-primary btn-sm" type="button"><app-icon name="clock" [size]="16"></app-icon> Web Clock-In</button>
        </div>
      </header>

      <div class="attendance-grid">
        <article class="surface stat-panel">
          <div class="section-head">
            <h2 class="section-title">Attendance stats</h2>
            <app-status-pill label="Last week" tone="info"></app-status-pill>
          </div>
          <div class="stat-row">
            <span class="avatar-tone me"><app-icon name="user" [size]="16"></app-icon></span>
            <strong>11h 56m</strong>
            <span>Avg hrs/day</span>
            <strong>100%</strong>
            <span>On-time arrival</span>
          </div>
          <div class="stat-row">
            <span class="avatar-tone team"><app-icon name="users" [size]="16"></app-icon></span>
            <strong>9h 46m</strong>
            <span>Team avg</span>
            <strong>72%</strong>
            <span>On-time arrival</span>
          </div>
        </article>

        <article class="surface timing-panel">
          <div class="section-head">
            <h2 class="section-title">Timings</h2>
            <app-icon name="activity" [size]="18"></app-icon>
          </div>
          <div class="weekday-row">
            <span *ngFor="let day of ['M','T','W','T','F','S','S']" [class.active]="day === 'F'">{{ day }}</span>
          </div>
          <p>Today (4:00 PM - 1:00 AM)</p>
          <div class="time-bar"><i></i><b></b></div>
          <small>Duration: 9h 0m · Break: 45 min</small>
        </article>

        <article class="surface actions-panel">
          <div class="section-head">
            <h2 class="section-title">Actions</h2>
            <app-status-pill label="Live" tone="success"></app-status-pill>
          </div>
          <strong>07:24 PM</strong>
          <span>Friday, 29 May 2026</span>
          <button class="btn btn-outline-primary btn-sm" type="button">Attendance Policy</button>
        </article>
      </div>

      <nav class="module-tabs" aria-label="Attendance views">
        <button class="active" type="button">Attendance Log</button>
        <button type="button">Calendar</button>
        <button type="button">Attendance Requests</button>
      </nav>

      <app-enterprise-data-table
        eyebrow="Last 30 days"
        title="Attendance logs"
        primaryAction="Regularize"
        rowKey="date"
        selectionLabelKey="date"
        [bulkActions]="['Export selected', 'Create regularization']"
        [columns]="data.attendanceColumns"
        [rows]="data.attendanceLogs().data"
        [loading]="data.attendanceLogs().loading">
      </app-enterprise-data-table>
    </section>
  `,
  styleUrl: './hrms-workspaces.scss'
})
export class AttendanceWorkspaceComponent {
  readonly data = inject(HrmsDemoDataService);
}
