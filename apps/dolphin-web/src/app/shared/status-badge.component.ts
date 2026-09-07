import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span class="status" [class]="tone">{{ label }}</span>`,
  styles: [`
    .status { display: inline-flex; align-items: center; min-height: 24px; padding: 2px 10px; font-size: 12px; font-weight: 600; border-radius: 999px; }
    .success { color: #107c41; background: #e9f8ef; }
    .warning { color: #925c00; background: #fff3cd; }
    .neutral { color: #4f5d75; background: #eef2f7; }
  `]
})
export class StatusBadgeComponent {
  @Input() label = 'Active';
  @Input() tone: 'success' | 'warning' | 'neutral' = 'success';
}
