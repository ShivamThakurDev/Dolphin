import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { StatusPillComponent } from '../../shared/status-pill.component';
import { DocumentRecord } from '../employee/employee-demo-data.service';

@Component({
  selector: 'app-document-center',
  standalone: true,
  imports: [CommonModule, AppIconComponent, StatusPillComponent],
  template: `
    <article class="document-center surface">
      <div class="section-head">
        <div>
          <p class="eyebrow">Document center</p>
          <h2 class="section-title">Employee records</h2>
        </div>
        <button class="icon-button" type="button" aria-label="Upload document"><app-icon name="upload" [size]="16"></app-icon></button>
      </div>

      <div class="document-list">
        <button *ngFor="let item of documents" type="button">
          <span><app-icon name="file" [size]="18"></app-icon></span>
          <div>
            <strong>{{ item.name }}</strong>
            <small>{{ item.count }} documents · {{ item.updated }}</small>
          </div>
          <app-status-pill [label]="item.status" [tone]="item.tone"></app-status-pill>
        </button>
      </div>
    </article>
  `,
  styles: [`
    .document-center {
      padding: 18px;
    }

    .section-head,
    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .document-list {
      display: grid;
      gap: 10px;
      margin-top: 14px;
    }

    .document-list button {
      width: 100%;
      min-height: 68px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-subtle);
      color: var(--color-text-primary);
      padding: 12px;
      text-align: left;
      transition: transform var(--motion-fast), border-color var(--motion-fast), background var(--motion-fast);
    }

    .document-list button:hover {
      border-color: color-mix(in srgb, var(--color-brand-500) 30%, var(--color-border));
      background: var(--color-surface-solid);
      transform: translateY(-1px);
    }

    .document-list button > span {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: var(--color-brand-50);
      color: var(--color-brand-700);
    }

    .document-list div {
      flex: 1;
      display: grid;
      gap: 2px;
    }

    small {
      color: var(--color-text-muted);
    }
  `]
})
export class DocumentCenterComponent {
  @Input() documents: DocumentRecord[] = [];
}
