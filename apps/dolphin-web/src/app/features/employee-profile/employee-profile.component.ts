import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { EnterpriseDataTableComponent } from '../../shared/enterprise-data-table.component';
import { StatusPillComponent } from '../../shared/status-pill.component';
import { DocumentCenterComponent } from '../document-center/document-center.component';
import { EmployeeDemoDataService } from '../employee/employee-demo-data.service';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, AppIconComponent, StatusPillComponent, EnterpriseDataTableComponent, DocumentCenterComponent],
  template: `
    <section class="profile-page">
      <article class="profile-hero surface">
        <div class="profile-identity">
          <div class="profile-photo">{{ profile().initials }}</div>
          <div>
            <p class="eyebrow">Employee command page</p>
            <h1 class="page-title">{{ profile().name }} <app-status-pill [label]="profile().status" tone="success"></app-status-pill></h1>
            <p class="body-small">{{ profile().role }} · {{ profile().department }} · {{ profile().location }}</p>
          </div>
        </div>
        <div class="profile-actions">
          <button class="btn btn-light btn-sm" type="button"><app-icon name="file" [size]="15"></app-icon> View dossier</button>
          <button class="btn btn-primary btn-sm" type="button"><app-icon name="plus" [size]="15"></app-icon> Start workflow</button>
        </div>
      </article>

      <div class="profile-grid">
        <article class="surface health-card">
          <p class="eyebrow">Profile health</p>
          <strong>{{ profile().profileHealth }}%</strong>
          <p class="body-small">{{ profile().profileHealthSummary }}</p>
          <div class="progress"><div class="progress-bar" [style.width.%]="profile().profileHealth"></div></div>
        </article>

        <article class="surface meta-card">
          <p class="eyebrow">Reporting chain</p>
          <div class="manager-row">
            <div class="avatar">{{ profile().manager.initials }}</div>
            <div><strong>{{ profile().manager.name }}</strong><span>{{ profile().manager.role }}</span></div>
          </div>
          <div class="meta-list">
            <span><app-icon name="inbox" [size]="15"></app-icon> {{ profile().email }}</span>
            <span><app-icon name="calendar" [size]="15"></app-icon> Joined {{ profile().joined }}</span>
          </div>
        </article>

        <app-document-center class="documents" [documents]="profile().documents"></app-document-center>

        <article class="surface timeline-card">
          <p class="eyebrow">Timeline</p>
          <h2 class="section-title">Recent employee events</h2>
          <ol>
            <li *ngFor="let event of profile().timeline"><span></span><div><strong>{{ event.title }}</strong><small>{{ event.meta }}</small></div></li>
          </ol>
        </article>

        <app-enterprise-data-table
          class="assets"
          eyebrow="Assigned assets"
          title="Asset custody"
          primaryAction="Request Asset"
          rowKey="asset"
          selectionLabelKey="asset"
          [bulkActions]="['Export selected']"
          [columns]="data.assetColumns"
          [rows]="data.assetRows()">
        </app-enterprise-data-table>
      </div>
    </section>
  `,
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {
  readonly data = inject(EmployeeDemoDataService);
  readonly profile = this.data.profile;
}
