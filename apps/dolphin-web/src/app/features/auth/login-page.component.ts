import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../core/auth.facade';
import { AppIconComponent } from '../../shared/app-icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AppIconComponent],
  template: `
    <main class="auth-page">
      <section class="auth-visual">
        <div class="brand-lockup">
          <div class="brand-mark">D</div>
          <div>
            <strong>Dolphin ERP</strong>
            <span>Modern HRMS command center</span>
          </div>
        </div>
        <div class="visual-copy">
          <p class="eyebrow">Enterprise SaaS workspace</p>
          <h1>Run people, finance and operations from one calm cockpit.</h1>
          <p>Inspired by proven ERP platforms, shaped for fast HR self-service and scalable multi-company SaaS workflows.</p>
        </div>
        <div class="visual-metrics glass-panel">
          <span><strong>99.9%</strong> platform target</span>
          <span><strong>17</strong> modular apps</span>
          <span><strong>RBAC</strong> ready</span>
        </div>
      </section>

      <section class="auth-panel" aria-labelledby="login-title">
        <div class="company-badge">
          <span>Dolphin Demo Pvt Ltd</span>
          <small>Tenant: demo</small>
        </div>

        <div class="auth-copy">
          <p class="eyebrow">Welcome back</p>
          <h2 id="login-title">Login to Dolphin</h2>
          <p>Use your work account to continue to HRMS Core.</p>
        </div>

        <form class="auth-form" (ngSubmit)="submit()">
          <label>
            <span>Email</span>
            <input class="form-control" name="email" type="email" [(ngModel)]="email" autocomplete="email" required>
          </label>
          <label>
            <span>Password</span>
            <input class="form-control" name="password" type="password" [(ngModel)]="password" autocomplete="current-password" required>
          </label>
          <label>
            <span>Tenant</span>
            <input class="form-control" name="tenant" type="text" [(ngModel)]="tenantSlug" autocomplete="organization" required>
          </label>
          <div class="captcha-row">
            <code>Demo</code>
            <button class="icon-button" type="button" aria-label="Refresh captcha"><app-icon name="activity" [size]="16"></app-icon></button>
            <input class="form-control" name="captcha" type="text" [(ngModel)]="captcha" placeholder="Demo captcha" aria-label="Demo captcha placeholder">
          </div>
          <p class="demo-note" *ngIf="auth.state().isDemoMode">Demo mode: CAPTCHA is visual only until the backend verification contract is added.</p>
          <p class="auth-error" *ngIf="auth.state().error">{{ auth.state().error }}</p>
          <button class="btn btn-primary w-100" type="submit" [disabled]="auth.state().loading">
            <app-icon name="chevron-right" [size]="16"></app-icon>
            {{ auth.state().loading ? 'Requesting code...' : 'Request verification code' }}
          </button>
          <button class="btn btn-link px-0" type="button">Forgot password?</button>
        </form>

        <div class="auth-footnote">
          <span>Dolphin ERP</span>
          <p>By logging in, you agree to tenant security policies and audit tracking.</p>
        </div>
      </section>
    </main>
  `,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);

  email = '';
  password = '';
  tenantSlug = 'demo';
  captcha = '';
  async submit(): Promise<void> {
    const result = await this.auth.requestOtp({
      email: this.email,
      password: this.password,
      tenantSlug: this.tenantSlug,
      captcha: this.captcha
    });

    if (!result.success || !result.redirectTo) {
      return;
    }

    void this.router.navigateByUrl(result.redirectTo);
  }
}
