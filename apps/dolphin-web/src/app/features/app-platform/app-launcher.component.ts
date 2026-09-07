import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppIconComponent } from '../../shared/app-icon.component';
import { StatusPillComponent } from '../../shared/status-pill.component';
import { AppModulesService } from './app-modules.service';

@Component({
  selector: 'app-app-launcher',
  standalone: true,
  imports: [CommonModule, AppIconComponent, StatusPillComponent],
  template: `
    <section class="app-launcher-page">
      <header class="surface launcher-hero">
        <div>
          <p class="eyebrow">Dolphin App Platform</p>
          <h1 class="page-title">Composable ERP modules for every tenant.</h1>
          <p class="body-small">Enable HRMS, finance, CRM and operations apps from a governed module registry without breaking Clean Architecture boundaries.</p>
        </div>
        <button class="btn btn-primary btn-sm" type="button"><app-icon name="plus" [size]="16"></app-icon> Register module</button>
      </header>

      <div class="module-grid">
        <article
          class="surface surface-interactive module-card"
          *ngFor="let app of appModules.modules()"
          [class.planned]="!app.enabled"
          [attr.role]="app.enabled ? 'button' : null"
          [attr.tabindex]="app.enabled ? 0 : null"
          [attr.aria-disabled]="!app.enabled"
          (click)="openModule(app.route, app.enabled)"
          (keydown.enter)="openModule(app.route, app.enabled)"
          (keydown.space)="openModule(app.route, app.enabled)">
          <div class="module-icon"><app-icon [name]="app.icon" [size]="20"></app-icon></div>
          <div>
            <div class="module-head">
              <h2>{{ app.name }}</h2>
              <app-status-pill [label]="app.enabled ? 'Enabled' : 'Planned'" [tone]="app.enabled ? 'success' : 'neutral'"></app-status-pill>
            </div>
            <p>{{ app.description }}</p>
          </div>
          <div class="module-meta">
            <span>{{ app.group }}</span>
            <span>{{ app.plan }}</span>
            <span>{{ app.route }}</span>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .app-launcher-page {
      display: grid;
      gap: 18px;
    }

    .launcher-hero {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 18px;
      padding: 24px;
      background:
        linear-gradient(135deg, color-mix(in srgb, var(--color-brand-500) 14%, transparent), transparent),
        var(--color-surface);
    }

    .launcher-hero p:last-child {
      max-width: 720px;
      margin: 0;
    }

    .module-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .module-card {
      display: grid;
      gap: 18px;
      padding: 18px;
      cursor: pointer;
    }

    .module-card.planned {
      cursor: not-allowed;
      opacity: .78;
    }

    .module-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-md);
      color: var(--color-brand-600);
      background: var(--color-brand-50);
    }

    .module-head {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
    }

    h2 {
      margin: 0;
      font-size: 1rem;
      color: var(--color-text);
    }

    p {
      margin: 8px 0 0;
      color: var(--color-text-muted);
      font-size: .9rem;
    }

    .module-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .module-meta span {
      padding: 5px 8px;
      border-radius: var(--radius-pill);
      background: var(--color-surface-subtle);
      color: var(--color-text-secondary);
      font-size: .74rem;
      font-weight: 800;
    }

    @media (max-width: 1100px) {
      .module-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 680px) {
      .launcher-hero { align-items: stretch; flex-direction: column; }
      .module-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AppLauncherComponent {
  readonly appModules = inject(AppModulesService);
  private readonly router = inject(Router);

  openModule(route: string, enabled: boolean): void {
    if (!enabled) {
      return;
    }

    void this.router.navigateByUrl(route);
  }
}
