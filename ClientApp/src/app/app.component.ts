import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, UserProfile } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dolphin';
  isLoginPage = false;
  currentUser: UserProfile | null = null;
  sprintHealth: 'healthy' | 'risk' = 'healthy';

  constructor(public authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.urlAfterRedirects.includes('/login');
    });
  }

  toggleSprintHealth(): void {
    this.sprintHealth = this.sprintHealth === 'healthy' ? 'risk' : 'healthy';
  }

  get userInitials(): string {
    if (!this.currentUser?.email) return 'SK';
    const parts = this.currentUser.email.split('@')[0].split('.');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return this.currentUser.email.substring(0, 2).toUpperCase();
  }

  get userName(): string {
    return this.currentUser?.displayName || (this.currentUser?.email ? this.currentUser.email.split('@')[0] : 'Admin User');
  }

  get userRole(): string {
    return this.currentUser?.roles?.[0] || 'Lead Architect · Engineering';
  }

  logout(): void {
    this.authService.logout();
  }
}
