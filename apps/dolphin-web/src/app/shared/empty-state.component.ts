import { Component, Input } from '@angular/core';
import { AppIconComponent } from './app-icon.component';
import { IconName } from './ui-models';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [AppIconComponent],
  template: `
    <section class="empty-state">
      <div class="empty-icon"><app-icon [name]="icon" [size]="28"></app-icon></div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <button class="btn btn-primary btn-sm" type="button">{{ actionLabel }}</button>
    </section>
  `,
  styles: [`
    .empty-state {
      min-height: 420px;
      display: grid;
      place-items: center;
      align-content: center;
      gap: 10px;
      padding: var(--space-8);
      text-align: center;
      color: var(--color-text-secondary);
    }

    .empty-icon {
      width: 64px;
      height: 64px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-lg);
      color: var(--color-brand-600);
      background: linear-gradient(135deg, var(--color-brand-50), #fff);
      border: 1px solid var(--color-brand-100);
      box-shadow: var(--shadow-sm);
    }

    h2 {
      margin: 0;
      font-size: 1.55rem;
      font-weight: 760;
    }

    p {
      max-width: 560px;
      margin: 0;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: IconName = 'layout';
  @Input() eyebrow = 'Module ready';
  @Input() title = 'Workflow canvas';
  @Input() description = 'This workspace is ready for connected APIs, approvals, reporting and automation.';
  @Input() actionLabel = 'Configure workflow';
}
