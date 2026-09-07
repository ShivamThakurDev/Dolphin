import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModuleRoute } from '../core/navigation.registry';
import { AppIconComponent } from '../shared/app-icon.component';
import { CommandSearchComponent } from './command-search.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, AppIconComponent, CommandSearchComponent],
  template: `
    <header class="topbar-wrap">
      <div class="topbar">
        <div class="crumbs" aria-label="Breadcrumb">
          <span>Dolphin Demo Pvt Ltd</span>
          <app-icon name="chevron-right" [size]="14"></app-icon>
          <strong>{{ activeSection }}</strong>
        </div>

        <app-command-search (open)="commandOpen.emit()"></app-command-search>

        <div class="topbar-actions">
          <button class="icon-button" type="button" aria-label="Toggle theme" (click)="themeToggle.emit()">
            <app-icon [name]="darkMode ? 'sun' : 'moon'" [size]="18"></app-icon>
          </button>
          <button class="icon-button notification" type="button" aria-label="Open notifications">
            <app-icon name="bell" [size]="18"></app-icon>
            <span></span>
          </button>
          <button class="profile-chip" type="button" aria-label="Open profile menu">
            <span>S</span>
            <div>
              <strong>Shivam</strong>
              <small>HR Admin</small>
            </div>
          </button>
        </div>
      </div>

      <nav class="top-tabs" aria-label="HRMS workspace tabs">
        <button *ngFor="let tab of tabs" type="button" [class.active]="activeSection === tab.id" (click)="sectionSelect.emit(tab.route)">
          {{ tab.label }}
        </button>
      </nav>
    </header>
  `,
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Input() activeSection = 'Home';
  @Input() tabs: ModuleRoute[] = [];
  @Input() darkMode = false;
  @Output() themeToggle = new EventEmitter<void>();
  @Output() commandOpen = new EventEmitter<void>();
  @Output() sectionSelect = new EventEmitter<string>();
}
