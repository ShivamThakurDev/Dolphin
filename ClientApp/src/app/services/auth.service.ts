import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError, map } from 'rxjs';
import { ApiEndpoint } from '../components/helpers/ApiEndpoint';
import { Router } from '@angular/router';

export interface UserProfile {
  userId: string;
  tenantId: string;
  email: string;
  displayName: string;
  roles: string[];
  employeeId?: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserProfile;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // If no token exists on startup in dev mode, auto-login with demo credentials
    if (!this.isAuthenticated()) {
      this.autoLoginDemo().subscribe();
    }
  }

  getRole(): string {
    const user = this.currentUserSubject.value;
    return user?.roles?.[0] || 'Admin';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('dolphin.accessToken');
    return !!token && token !== 'demo-token';
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem('dolphin.accessToken');
    return token && token !== 'demo-token' ? token : null;
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, tenant: string = 'demo'): Observable<AuthResult> {
    return this.http.post<any>(ApiEndpoint.authLogin, {
      email,
      password,
      tenantSlug: tenant,
      deviceName: 'DolphinWebClient'
    }).pipe(
      map(res => {
        // Handle if response is wrapped in ApiResponse envelope
        return res?.data ? res.data : res;
      }),
      tap((result: AuthResult) => {
        if (result && result.accessToken) {
          localStorage.setItem('dolphin.accessToken', result.accessToken);
          localStorage.setItem('token', result.accessToken);
          localStorage.setItem('dolphin.refreshToken', result.refreshToken);
          localStorage.setItem('dolphin.tenantId', result.user.tenantId);
          localStorage.setItem('tenantId', result.user.tenantId);
          localStorage.setItem('dolphin.user', JSON.stringify(result.user));
          if (result.user.employeeId) {
            localStorage.setItem('dolphin.employeeId', result.user.employeeId);
          }
          this.currentUserSubject.next(result.user);
        }
      })
    );
  }

  autoLoginDemo(): Observable<boolean> {
    return this.login('admin@dolphin.local', 'Admin@12345', 'demo').pipe(
      map(() => true),
      catchError(err => {
        console.warn('Demo auto-login was not completed:', err);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('dolphin.accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('dolphin.refreshToken');
    localStorage.removeItem('dolphin.tenantId');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('dolphin.user');
    localStorage.removeItem('dolphin.employeeId');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private getStoredUser(): UserProfile | null {
    const json = localStorage.getItem('dolphin.user');
    if (!json) return null;
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
