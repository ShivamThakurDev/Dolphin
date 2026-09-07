import { Component, EventEmitter, Output } from '@angular/core';
import { AppIconComponent } from '../shared/app-icon.component';

@Component({
  selector: 'app-command-search',
  standalone: true,
  imports: [AppIconComponent],
  template: `
    <button class="command-search" type="button" aria-label="Open command search" (click)="open.emit()">
      <app-icon name="search" [size]="18"></app-icon>
      <span>Search employees, actions, reports...</span>
      <kbd class="command-key">Alt K</kbd>
    </button>
  `,
  styles: [`
    .command-search {
      width: min(620px, 46vw);
      height: 44px;
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
      border-radius: var(--radius-pill);
      background: var(--color-surface-solid);
      color: var(--color-text-muted);
      padding: 0 12px 0 14px;
      box-shadow: var(--shadow-xs);
      transition: border-color var(--motion-fast), box-shadow var(--motion-fast), transform var(--motion-fast);
    }

    .command-search:hover,
    .command-search:focus-visible {
      border-color: color-mix(in srgb, var(--color-brand-500) 42%, var(--color-border));
      box-shadow: var(--focus-ring);
      transform: translateY(-1px);
    }

    span {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      font-size: .92rem;
    }

    @media (max-width: 760px) {
      .command-search { width: 100%; }
      .command-key { display: none; }
    }
  `]
})
export class CommandSearchComponent {
  @Output() open = new EventEmitter<void>();
}
