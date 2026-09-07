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

  logout(): void {
    this.authService.logout();
  }
}
