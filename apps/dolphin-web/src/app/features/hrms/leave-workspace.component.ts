import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { EnterpriseDataTableComponent } from '../../shared/enterprise-data-table.component';
import { StatusPillComponent } from '../../shared/status-pill.component';
import { HrmsDemoDataService } from './hrms-demo-data.service';

@Component({
  selector: 'app-leave-workspace',
  standalone: true,
  imports: [CommonModule, AppIconComponent, EnterpriseDataTableComponent, StatusPillComponent],
  template: `
    <section class="hrms-page">
      <header class="workspace-head">
        <div>
          <p class="eyebrow">Leave</p>
          <h1 class="page-title">Leave summary</h1>
          <p class="body-small">A clean self-service view for balances, trends, requests and policy guidance.</p>
        </div>
        <button class="btn btn-primary btn-sm" type="button"><app-icon name="plus" [size]="16"></app-icon> Request Leave</button>
      </header>

      <div class="pending-card surface">
        <div class="celebrate-mark"><app-icon name="sparkles" [size]="20"></app-icon></div>
        <div>
          <strong>Hurray! No pending leave requests</strong>
          <span>Request leave from the right or review previous approvals below.</span>
        </div>
        <div class="policy-links">
          <button class="btn btn-light btn-sm" type="button">Comp-off credit</button>
          <button class="btn btn-link btn-sm" type="button">Leave policy</button>
        </div>
      </div>

      <section>
        <div class="section-head mb-3">
          <h2 class="section-title">My leave stats</h2>
          <app-status-pill label="Jan 2026 - Dec 2026" tone="brand"></app-status-pill>
        </div>
        <div class="leave-stats-grid">
          <article class="surface mini-chart">
            <h3>Weekly pattern</h3>
            <div class="bar-row">
              <i style="height: 12%"></i><i style="height: 38%"></i><i style="height: 24%"></i><i style="height: 48%"></i><i style="height: 70%"></i><i style="height: 8%"></i><i style="height: 4%"></i>
            </div>
          </article>
          <article class="surface donut-stat">
            <h3>Consumed leave types</h3>
            <div class="donut"><span>Leave<br>Types</span></div>
          </article>
          <article class="surface mini-chart wide">
            <h3>Monthly stats</h3>
            <div class="bar-row monthly">
              <i *ngFor="let h of monthlyHeights" [style.height.%]="h"></i>
            </div>
          </article>
        </div>
      </section>

      <section>
        <h2 class="section-title mb-3">Leave balances</h2>
        <div class="balance-grid">
          <article class="surface balance-card" *ngFor="let balance of data.leaveBalances().data">
            <div class="balance-head">
              <h3>{{ balance.name }}</h3>
              <button class="btn btn-link btn-sm" type="button">View details</button>
            </div>
            <div class="balance-donut" [style.--progress.%]="balance.progress">
              <span>{{ balance.available }}<small>Available</small></span>
            </div>
            <div class="balance-meta">
              <span>Available <strong>{{ balance.available }}</strong></span>
              <span>Consumed <strong>{{ balance.consumed }}</strong></span>
              <span>Annual quota <strong>{{ balance.quota }}</strong></span>
            </div>
          </article>
        </div>
      </section>

      <app-enterprise-data-table
        eyebrow="Leave history"
        title="Requests and approvals"
        primaryAction="Request leave"
        rowKey="date"
        selectionLabelKey="leaveType"
        [bulkActions]="['Export selected']"
        [columns]="data.leaveHistoryColumns"
        [rows]="data.leaveHistory().data"
        [loading]="data.leaveHistory().loading">
      </app-enterprise-data-table>
    </section>
  `,
  styleUrl: './hrms-workspaces.scss'
})
export class LeaveWorkspaceComponent {
  readonly data = inject(HrmsDemoDataService);
  readonly monthlyHeights = [42, 18, 54, 16, 30, 5, 4, 6, 3, 4, 3, 2];
}
