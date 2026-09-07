import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppIconComponent } from '../shared/app-icon.component';
import { NavigationItem } from '../shared/ui-models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  animations: [
    trigger('labelMotion', [
      state('expanded', style({ opacity: 1, width: '*' })),
      state('collapsed', style({ opacity: 0, width: '0px' })),
      transition('expanded <=> collapsed', animate('180ms ease'))
    ])
  ],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed">
      <div class="brand-row">
        <div class="brand-mark">D</div>
        <div class="brand-copy" [@labelMotion]="collapsed ? 'collapsed' : 'expanded'">
          <strong>Dolphin</strong>
          <span>ERP Command Center</span>
        </div>
      </div>

      <button class="collapse-btn" type="button" [attr.aria-label]="collapsed ? 'Expand sidebar' : 'Collapse sidebar'" (click)="toggleCollapse.emit()">
        <app-icon [name]="collapsed ? 'chevron-right' : 'chevron-left'" [size]="16"></app-icon>
      </button>

      <nav aria-label="Primary">
        <ng-container *ngFor="let group of groups">
          <p class="nav-group" [@labelMotion]="collapsed ? 'collapsed' : 'expanded'">{{ group.label }}</p>
          <button
            *ngFor="let item of itemsByGroup(group.id)"
            type="button"
            class="nav-item"
            [class.active]="activeSection === item.id"
            [attr.aria-current]="activeSection === item.id ? 'page' : null"
            [attr.title]="collapsed ? item.label : null"
            (click)="select.emit(item.route)">
            <app-icon [name]="item.icon" [size]="18"></app-icon>
            <span [@labelMotion]="collapsed ? 'collapsed' : 'expanded'">{{ item.label }}</span>
            <em *ngIf="item.badge && !collapsed">{{ item.badge }}</em>
          </button>
        </ng-container>
      </nav>
    </aside>
  `,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() activeSection = 'Home';
  @Input() items: NavigationItem[] = [];
  @Output() select = new EventEmitter<string>();
  @Output() toggleCollapse = new EventEmitter<void>();

  readonly groups = [
    { id: 'workspace', label: 'Workspace' },
    { id: 'people', label: 'People' },
    { id: 'operations', label: 'Operations' },
    { id: 'system', label: 'System' }
  ] as const;

  itemsByGroup(group: NavigationItem['group']): NavigationItem[] {
    return this.items.filter(item => item.group === group);
  }
}
