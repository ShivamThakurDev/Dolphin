import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { KpiMetric } from '../../shared/ui-models';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [AppIconComponent],
  animations: [
    trigger('cardIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <article class="kpi-card surface surface-interactive" [class]="'tone-' + metric.tone" @cardIn>
      <div class="kpi-top">
        <div class="kpi-icon"><app-icon [name]="metric.icon" [size]="18"></app-icon></div>
        <span class="kpi-delta" [class.down]="metric.trend === 'down'">{{ metric.delta }}</span>
      </div>
      <p>{{ metric.label }}</p>
      <strong class="metric-value">{{ metric.value }}</strong>
    </article>
  `,
  styles: [`
    .kpi-card {
      min-height: 138px;
      display: grid;
      align-content: space-between;
      padding: 18px;
    }

    .kpi-top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }

    .kpi-icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      color: var(--color-brand-700);
      background: var(--color-brand-50);
    }

    p {
      margin: 12px 0 6px;
      color: var(--color-text-muted);
      font-size: .84rem;
      font-weight: 650;
    }

    .kpi-delta {
      color: var(--color-accent-emerald);
      font-size: .78rem;
      font-weight: 760;
    }

    .kpi-delta.down {
      color: var(--color-accent-rose);
    }

    @media (max-width: 520px) {
      .kpi-card {
        min-height: 122px;
      }

      .kpi-delta {
        display: none;
      }
    }
  `]
})
export class KpiCardComponent {
  @Input({ required: true }) metric!: KpiMetric;
}
