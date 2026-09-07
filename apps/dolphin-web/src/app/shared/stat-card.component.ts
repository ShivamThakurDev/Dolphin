import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <article class="stat-card">
      <div class="icon"><i class="bi" [class]="icon"></i></div>
      <div>
        <p>{{ label }}</p>
        <strong>{{ value }}</strong>
        <span>{{ hint }}</span>
      </div>
    </article>
  `,
  styles: [`
    .stat-card { display: flex; gap: 14px; align-items: center; background: var(--dolphin-card); border: 1px solid var(--dolphin-border); padding: 18px; min-height: 112px; }
    .icon { width: 44px; height: 44px; display: grid; place-items: center; background: var(--dolphin-purple-soft); color: var(--dolphin-purple); border-radius: 8px; font-size: 20px; }
    p { margin: 0; color: var(--dolphin-muted); font-size: 13px; }
    strong { display: block; font-size: 28px; line-height: 1.1; margin: 4px 0; }
    span { color: var(--dolphin-muted); font-size: 12px; }
  `]
})
export class StatCardComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = '';
  @Input() hint = '';
  @Input() icon = 'bi-graph-up';
}
