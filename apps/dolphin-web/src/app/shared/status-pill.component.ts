import { Component, Input } from '@angular/core';
import { Tone } from './ui-models';

@Component({
  selector: 'app-status-pill',
  standalone: true,
  template: `<span class="status-pill" [class]="'tone-' + tone"><span></span>{{ label }}</span>`,
  styles: [`
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 24px;
      padding: 3px 10px;
      border: 1px solid transparent;
      border-radius: var(--radius-pill);
      font-size: 0.75rem;
      font-weight: 720;
      white-space: nowrap;
    }

    .status-pill span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .tone-success { color: #087443; background: #e8f7ef; border-color: #bdebd0; }
    .tone-warning { color: #93620b; background: #fff6df; border-color: #f2d79a; }
    .tone-danger { color: #b4233c; background: #fff0f3; border-color: #ffd0d9; }
    .tone-brand { color: var(--color-brand-700); background: var(--color-brand-50); border-color: var(--color-brand-100); }
    .tone-info { color: #086b82; background: #e7f9fc; border-color: #bdebf2; }
    .tone-neutral { color: var(--color-text-secondary); background: var(--color-surface-subtle); border-color: var(--color-border); }
  `]
})
export class StatusPillComponent {
  @Input() label = 'Active';
  @Input() tone: Tone = 'neutral';
}
