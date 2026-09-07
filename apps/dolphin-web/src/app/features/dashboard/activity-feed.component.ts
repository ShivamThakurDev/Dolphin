import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { ActivityItem } from '../../shared/ui-models';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  template: `
    <article class="activity-card surface">
      <div class="section-head">
        <div>
          <p class="eyebrow">Realtime</p>
          <h2 class="section-title">Activity feed</h2>
        </div>
        <span class="live"><span></span>Live</span>
      </div>

      <ol>
        <li *ngFor="let item of items">
          <span class="timeline-dot" [class]="'tone-' + item.tone"></span>
          <div>
            <strong>{{ item.actor }}</strong>
            <p>{{ item.action }}</p>
            <small>{{ item.meta }}</small>
          </div>
        </li>
      </ol>
    </article>
  `,
  styles: [`
    .activity-card {
      height: 100%;
      padding: 18px;
    }

    .section-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .live {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: var(--color-accent-emerald);
      font-size: .78rem;
      font-weight: 760;
    }

    .live span,
    .timeline-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
    }

    ol {
      display: grid;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 10px;
      padding: 13px 0;
      border-bottom: 1px solid var(--color-border);
    }

    li:last-child {
      border-bottom: 0;
    }

    .timeline-dot {
      margin-top: 6px;
      color: var(--color-brand-500);
      box-shadow: 0 0 0 4px color-mix(in srgb, currentColor 12%, transparent);
    }

    p, small {
      margin: 0;
      color: var(--color-text-secondary);
    }

    small {
      color: var(--color-text-muted);
      font-size: .78rem;
    }
  `]
})
export class ActivityFeedComponent {
  @Input() items: ActivityItem[] = [];
}
