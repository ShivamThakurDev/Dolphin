import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MODULE_ROUTES, PRIMARY_NAV_ITEMS, TOP_TABS } from '../core/navigation.registry';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';
import { CommandPaletteComponent } from './command-palette.component';
import { ToastStackComponent } from '../shared/toast-stack.component';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TopbarComponent,
    CommandPaletteComponent,
    ToastStackComponent
  ],
  template: `
    <div class="shell" [class.sidebar-collapsed]="sidebarCollapsed()">
      <app-sidebar
        [items]="navItems"
        [activeSection]="activeSection()"
        [collapsed]="sidebarCollapsed()"
        (select)="navigate($event)"
        (toggleCollapse)="toggleSidebar()">
      </app-sidebar>

      <main class="main">
        <app-topbar
          [activeSection]="activeSection()"
          [tabs]="topTabs"
          [darkMode]="darkMode()"
          (themeToggle)="toggleTheme()"
          (commandOpen)="commandOpen.set(true)"
          (sectionSelect)="navigate($event)">
        </app-topbar>

        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </main>

      <app-toast-stack></app-toast-stack>
      <app-command-palette
        [open]="commandOpen()"
        (close)="commandOpen.set(false)"
        (select)="selectCommand($event)">
      </app-command-palette>
    </div>
  `,
  styleUrl: './shell-layout.component.scss'
})
export class ShellLayoutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly activeSection = signal('Home');
  readonly sidebarCollapsed = signal(false);
  readonly darkMode = signal(false);
  readonly commandOpen = signal(false);
  readonly navItems = PRIMARY_NAV_ITEMS;
  readonly topTabs = TOP_TABS;

  ngOnInit(): void {
    this.syncActiveSection();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.syncActiveSection());
  }

  @HostListener('document:keydown.alt.k', ['$event'])
  openCommandPalette(event: KeyboardEvent): void {
    event.preventDefault();
    this.commandOpen.set(true);
  }

  toggleTheme(): void {
    this.darkMode.update(value => !value);
    document.documentElement.dataset['theme'] = this.darkMode() ? 'dark' : 'light';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(value => !value);
  }

  navigate(route: string): void {
    void this.router.navigateByUrl(route);
  }

  selectCommand(route: string): void {
    this.navigate(route);
    this.commandOpen.set(false);
  }

  private syncActiveSection(): void {
    let child = this.route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }

    const moduleId = child?.snapshot.data['moduleId'] as string | undefined;
    if (moduleId) {
      this.activeSection.set(moduleId);
      return;
    }

    const route = MODULE_ROUTES.find(item => this.router.url.startsWith(item.route));
    this.activeSection.set(route?.id ?? 'Home');
  }
}
