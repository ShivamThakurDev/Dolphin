import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { AppIconComponent } from '../../shared/app-icon.component';
import { ActivityItem, KpiMetric, QuickAction } from '../../shared/ui-models';
import { KpiCardComponent } from './kpi-card.component';
import { WorkflowCardComponent } from './workflow-card.component';
import { ActivityFeedComponent } from './activity-feed.component';
import { AiAssistantCardComponent } from './ai-assistant-card.component';
import { StatusPillComponent } from '../../shared/status-pill.component';

@Component({
  selector: 'app-bento-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AppIconComponent,
    KpiCardComponent,
    WorkflowCardComponent,
    ActivityFeedComponent,
    AiAssistantCardComponent,
    StatusPillComponent
  ],
  template: `
    <section class="dashboard-page">
      <div class="hero surface">
        <div>
          <p class="eyebrow">Friday, 22 May 2026</p>
          <h1 class="page-title">Good evening, Shivam.</h1>
          <p class="body-small">Your HR operations are healthy. Four manager actions need review before payroll lock.</p>
        </div>
        <div class="hero-actions">
          <button class="btn btn-light btn-sm" type="button"><app-icon name="download" [size]="16"></app-icon> Export</button>
          <button class="btn btn-primary btn-sm" type="button"><app-icon name="plus" [size]="16"></app-icon> New workflow</button>
        </div>
      </div>

      <div class="kpi-grid">
        <app-kpi-card *ngFor="let metric of metrics" [metric]="metric"></app-kpi-card>
      </div>

      <div class="bento-grid">
        <article class="surface chart-card">
          <div class="section-head">
            <div>
              <p class="eyebrow">Analytics</p>
              <h2 class="section-title">Workforce momentum</h2>
            </div>
            <app-status-pill label="Synced" tone="success"></app-status-pill>
          </div>
          <canvas id="premiumWorkforceChart"></canvas>
        </article>

        <app-workflow-card class="bento-workflows" [actions]="quickActions"></app-workflow-card>

        <article class="surface attendance-card">
          <div class="section-head">
            <div>
              <p class="eyebrow">Attendance</p>
              <h2 class="section-title">Time today</h2>
            </div>
            <app-icon name="clock" [size]="18"></app-icon>
          </div>
          <strong>05:44 <span>PM</span></strong>
          <p>2 remote check-ins, 0 regularization requests.</p>
          <button class="btn btn-primary btn-sm" type="button">Web Clock-In</button>
        </article>

        <article class="surface insights-card">
          <p class="eyebrow">Employee insights</p>
          <h2>Profile completion is at 84%</h2>
          <div class="progress" aria-label="Profile completion">
            <div class="progress-bar" style="width: 84%"></div>
          </div>
          <ul>
            <li><span class="status-dot"></span> 6 pending document verifications</li>
            <li><span class="status-dot"></span> 3 assets need acknowledgement</li>
          </ul>
        </article>

        <app-ai-assistant-card class="bento-ai"></app-ai-assistant-card>
        <app-activity-feed class="bento-feed" [items]="activities"></app-activity-feed>
      </div>
    </section>
  `,
  styleUrl: './bento-dashboard.component.scss'
})
export class BentoDashboardComponent implements AfterViewInit, OnDestroy {
  private chart?: Chart;

  readonly metrics: KpiMetric[] = [
    { label: 'Active employees', value: '72', delta: '+8 this quarter', trend: 'up', icon: 'users', tone: 'brand' },
    { label: 'Pending actions', value: '4', delta: '2 urgent', trend: 'flat', icon: 'inbox', tone: 'warning' },
    { label: 'On leave today', value: '0', delta: 'All staffed', trend: 'up', icon: 'calendar', tone: 'success' },
    { label: 'Remote today', value: '2', delta: '+1 vs yesterday', trend: 'up', icon: 'home', tone: 'info' }
  ];

  readonly quickActions: QuickAction[] = [
    { label: 'Apply leave', description: 'Create request in 2 clicks', icon: 'calendar', tone: 'brand' },
    { label: 'Clock in', description: 'Start today’s attendance', icon: 'clock', tone: 'success' },
    { label: 'Upload document', description: 'Verify employee records', icon: 'upload', tone: 'info' },
    { label: 'Run payroll precheck', description: 'Find exceptions early', icon: 'dollar', tone: 'warning' }
  ];

  readonly activities: ActivityItem[] = [
    { actor: 'Anjali Sharma', action: 'approved a leave request for Engineering.', meta: '2 min ago', tone: 'success' },
    { actor: 'Payroll Bot', action: 'found 3 attendance mismatches before lock.', meta: '11 min ago', tone: 'warning' },
    { actor: 'Sudhir Kumar', action: 'acknowledged assigned hardware assets.', meta: '26 min ago', tone: 'brand' },
    { actor: 'Dolphin AI', action: 'prepared a weekly HR health summary.', meta: '1 hour ago', tone: 'info' }
  ];

  ngAfterViewInit(): void {
    const canvas = document.getElementById('premiumWorkforceChart') as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          { label: 'Headcount', data: [42, 48, 53, 59, 64, 72], borderColor: '#6547d5', backgroundColor: 'rgba(101,71,213,.12)', tension: .38, fill: true },
          { label: 'Engagement', data: [68, 71, 69, 74, 78, 82], borderColor: '#12a8b5', backgroundColor: 'rgba(18,168,181,.08)', tension: .38, fill: true }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { border: { display: false }, grid: { color: 'rgba(148, 163, 184, .18)' } }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
