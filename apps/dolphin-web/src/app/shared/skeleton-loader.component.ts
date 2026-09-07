import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-stack" aria-hidden="true">
      <span class="skeleton" *ngFor="let row of rowsArray" [style.width.%]="row"></span>
    </div>
  `,
  styles: [`
    .skeleton-stack { display: grid; gap: 10px; }
    .skeleton { display: block; height: 12px; }
  `]
})
export class SkeletonLoaderComponent {
  @Input() rows: number[] = [100, 86, 72];
  get rowsArray(): number[] {
    return this.rows;
  }
}
