import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../core/auth.facade';
import { AppIconComponent } from '../../shared/app-icon.component';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, AppIconComponent],
  template: `
    <main class="otp-page">
      <section class="otp-card surface">
        <div class="otp-mark"><app-icon name="shield" [size]="26"></app-icon></div>
        <p class="eyebrow">Two-step verification</p>
        <h1>Enter code</h1>
        <p>We texted your phone ending in <strong>18</strong>. Enter the code to sign in.</p>

        <form (ngSubmit)="submit()">
          <input class="form-control" name="code" [(ngModel)]="code" inputmode="numeric" maxlength="6" placeholder="Code" aria-label="Verification code">
          <p class="otp-error" *ngIf="auth.state().error">{{ auth.state().error }}</p>
          <button class="btn btn-primary w-100" type="submit" [disabled]="auth.state().loading">
            <app-icon name="check" [size]="16"></app-icon>
            {{ auth.state().loading ? 'Verifying...' : 'Verify and open workspace' }}
          </button>
          <button class="btn btn-link" type="button">Resend code</button>
        </form>
      </section>
    </main>
  `,
  styles: [`
    .otp-page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 22px;
      background:
        radial-gradient(circle at 25% 20%, color-mix(in srgb, var(--color-brand-500) 18%, transparent), transparent 34%),
        linear-gradient(135deg, var(--color-background), var(--color-surface-subtle));
    }

    .otp-card {
      width: min(440px, 100%);
      padding: 34px;
      text-align: center;
    }

    .otp-mark {
      width: 60px;
      height: 60px;
      display: grid;
      place-items: center;
      margin: 0 auto 18px;
      border-radius: 20px;
      color: var(--color-brand-600);
      background: var(--color-brand-50);
    }

    h1 {
      margin: 0 0 10px;
      color: var(--color-text);
      font-size: 2rem;
    }

    p:not(.eyebrow) {
      color: var(--color-text-muted);
    }

    form {
      display: grid;
      gap: 14px;
      margin-top: 22px;
    }

    .form-control {
      height: 54px;
      border-radius: var(--radius-sm);
      text-align: center;
      font-size: 1.35rem;
      letter-spacing: .12em;
    }

    .otp-error {
      margin: -4px 0 0;
      color: var(--color-danger-600, #dc2626);
      font-size: .82rem;
    }
  `]
})
export class OtpVerifyComponent {
  readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);

  code = '';

  async submit(): Promise<void> {
    const result = await this.auth.verifyOtp(this.code);
    if (!result.success || !result.redirectTo) {
      return;
    }

    void this.router.navigateByUrl(result.redirectTo);
  }
}
