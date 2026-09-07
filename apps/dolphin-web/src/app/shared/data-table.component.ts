import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-tools">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input class="form-control" placeholder="Search">
      </div>
      <button class="btn btn-light" title="Filter"><i class="bi bi-funnel"></i></button>
    </div>
    <div class="table-responsive">
      <table class="table align-middle">
        <thead><tr><th *ngFor="let column of columns">{{ column }}</th></tr></thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-tools { display: flex; justify-content: flex-end; gap: 10px; padding: 12px; border-bottom: 1px solid var(--dolphin-border); }
    .input-group { max-width: 320px; }
    table { margin: 0; }
    th { color: var(--dolphin-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; background: #f4f6f9; }
    td { color: var(--dolphin-text); font-size: 14px; }
  `]
})
export class DataTableComponent {
  @Input() columns: string[] = [];
  @Input() rows: Record<string, string>[] = [];
}
