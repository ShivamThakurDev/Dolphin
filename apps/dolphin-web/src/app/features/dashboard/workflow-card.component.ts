import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { QuickAction } from '../../shared/ui-models';

@Component({
  selector: 'app-workflow-card',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  template: `
    <article class="workflow-card surface">
      <div class="section-head">
        <div>
          <p class="eyebrow">Fast workflows</p>
          <h2 class="section-title">Quick actions</h2>
        </div>
        <button class="icon-button" type="button" aria-label="Customize quick actions">
          <app-icon name="settings" [size]="16"></app-icon>
        </button>
      </div>

      <button *ngFor="let action of actions" class="workflow-action" type="button">
        <span class="action-icon" [class]="'tone-' + action.tone"><app-icon [name]="action.icon" [size]="18"></app-icon></span>
        <span>
          <strong>{{ action.label }}</strong>
          <small>{{ action.description }}</small>
        </span>
        <app-icon name="chevron-right" [size]="16"></app-icon>
      </button>
    </article>
  `,
  styles: [`
    .workflow-card {
      display: grid;
      gap: 12px;
      padding: 18px;
    }

    .section-head,
    .workflow-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .workflow-action {
      width: 100%;
      min-height: 62px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-subtle);
      color: var(--color-text-primary);
      padding: 10px 12px;
      text-align: left;
      transition: background var(--motion-fast), transform var(--motion-fast), border-color var(--motion-fast);
    }

    .workflow-action:hover {
      border-color: color-mix(in srgb, var(--color-brand-500) 30%, var(--color-border));
      background: var(--color-surface-solid);
      transform: translateX(2px);
    }

    .workflow-action > span:nth-child(2) {
      flex: 1;
      display: grid;
      gap: 2px;
    }

    small {
      color: var(--color-text-muted);
    }

    .action-icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: var(--color-brand-50);
      color: var(--color-brand-700);
    }

    .tone-success { color: var(--color-accent-emerald); background: #e8f7ef; }
    .tone-warning { color: var(--color-accent-amber); background: #fff6df; }
    .tone-info { color: #08748f; background: #e7f9fc; }
    .tone-brand { color: var(--color-brand-700); background: var(--color-brand-50); }
  `]
})
export class WorkflowCardComponent {
  @Input() actions: QuickAction[] = [];
}
