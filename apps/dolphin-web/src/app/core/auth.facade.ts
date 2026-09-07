import { Injectable, computed, signal } from '@angular/core';

export type AuthStage = 'anonymous' | 'otp-pending' | 'authenticated';

export interface LoginFormValue {
  email: string;
  password: string;
  tenantSlug: string;
  captcha?: string;
}

export interface AuthUser {
  displayName: string;
  role: string;
  tenantSlug: string;
  email: string;
}

export interface AuthResult {
  success: boolean;
  redirectTo?: '/otp' | '/dashboard';
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly stage = signal<AuthStage>(this.readInitialStage());
  private readonly pendingEmail = signal<string>('');
  private readonly loading = signal(false);
  private readonly error = signal<string | null>(null);
  private readonly tenantSlug = signal<string>(sessionStorage.getItem('dolphin.auth.tenant') ?? 'demo');
  private readonly user = signal<AuthUser | null>(this.readInitialStage() === 'authenticated' ? this.demoUser() : null);

  readonly state = computed(() => ({
    stage: this.stage(),
    pendingEmail: this.pendingEmail(),
    loading: this.loading(),
    error: this.error(),
    tenantSlug: this.tenantSlug(),
    user: this.user(),
    isAuthenticated: this.stage() === 'authenticated',
    isOtpPending: this.stage() === 'otp-pending',
    isDemoMode: true
  }));

  async requestOtp(value: LoginFormValue): Promise<AuthResult> {
    this.loading.set(true);
    this.error.set(null);

    if (!value.email.trim() || !value.password.trim() || !value.tenantSlug.trim()) {
      return this.fail('Enter email, password, and tenant to request a verification code.');
    }

    this.pendingEmail.set(value.email.trim());
    this.tenantSlug.set(value.tenantSlug.trim());
    this.stage.set('otp-pending');
    sessionStorage.setItem('dolphin.auth.stage', 'otp-pending');
    sessionStorage.setItem('dolphin.auth.tenant', value.tenantSlug.trim());
    this.loading.set(false);
    return { success: true, redirectTo: '/otp' };
  }

  async verifyOtp(code: string): Promise<AuthResult> {
    this.loading.set(true);
    this.error.set(null);

    if (!/^\d{6}$/.test(code.trim())) {
      return this.fail('Enter a 6 digit verification code.');
    }

    this.stage.set('authenticated');
    this.user.set(this.demoUser());
    sessionStorage.setItem('dolphin.auth.stage', 'authenticated');
    this.loading.set(false);
    return { success: true, redirectTo: '/dashboard' };
  }

  logout(): void {
    this.stage.set('anonymous');
    this.pendingEmail.set('');
    this.user.set(null);
    this.error.set(null);
    sessionStorage.removeItem('dolphin.auth.stage');
    sessionStorage.removeItem('dolphin.auth.tenant');
  }

  private readInitialStage(): AuthStage {
    const stored = sessionStorage.getItem('dolphin.auth.stage');
    return stored === 'authenticated' || stored === 'otp-pending' ? stored : 'anonymous';
  }

  private fail(error: string): AuthResult {
    this.error.set(error);
    this.loading.set(false);
    return { success: false, error };
  }

  private demoUser(): AuthUser {
    return {
      displayName: 'Shivam',
      role: 'HR Admin',
      tenantSlug: this.tenantSlug(),
      email: this.pendingEmail() || 'demo.user@dolphin.local'
    };
  }
}
