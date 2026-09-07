import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppIconComponent } from './app-icon.component';
import { EmptyStateComponent } from './empty-state.component';
import { SkeletonLoaderComponent } from './skeleton-loader.component';
import { StatusPillComponent } from './status-pill.component';
import { TableColumn, Tone } from './ui-models';

export interface TableActionEvent<T> {
  action: string;
  rows: T[];
}

@Component({
  selector: 'app-enterprise-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, AppIconComponent, EmptyStateComponent, SkeletonLoaderComponent, StatusPillComponent],
  template: `
    <article class="enterprise-table surface">
      <header class="table-header">
        <div>
          <p class="eyebrow">{{ eyebrow }}</p>
          <h2 class="section-title">{{ title }}</h2>
        </div>
        <div class="table-actions">
          <button *ngIf="showExport" class="btn btn-light btn-sm" type="button" (click)="exportClick.emit()"><app-icon name="download" [size]="15"></app-icon> Export</button>
          <button class="btn btn-primary btn-sm" type="button" (click)="primaryActionClick.emit()"><app-icon name="plus" [size]="15"></app-icon> {{ primaryAction }}</button>
        </div>
      </header>

      <div class="table-toolbar">
        <label class="table-search">
          <app-icon name="search" [size]="16"></app-icon>
          <input [ngModel]="searchTerm" (ngModelChange)="setSearchTerm($event)" type="search" placeholder="Search records" aria-label="Search table">
        </label>
        <button *ngIf="showFilters" class="btn btn-light btn-sm" type="button"><app-icon name="filter" [size]="15"></app-icon> Filters</button>
        <div class="density-toggle" aria-label="Table density">
          <button type="button" [class.active]="density() === 'compact'" (click)="density.set('compact')">Compact</button>
          <button type="button" [class.active]="density() === 'comfortable'" (click)="density.set('comfortable')">Comfort</button>
        </div>
      </div>

      <div class="bulk-bar" *ngIf="selectedCount() > 0">
        <strong>{{ selectedCount() }} selected</strong>
        <button *ngFor="let action of bulkActions" class="btn btn-sm btn-outline-primary" type="button" (click)="emitBulkAction(action)">{{ action }}</button>
      </div>

      <app-skeleton-loader *ngIf="loading" [rows]="[100,92,78,86]"></app-skeleton-loader>

      <div class="table-scroll" *ngIf="!loading && pagedRows().length">
        <table class="table mb-0" [class.table-compact]="density() === 'compact'">
          <thead>
            <tr>
              <th class="select-cell"><input class="form-check-input" type="checkbox" aria-label="Select all visible rows" [checked]="allVisibleSelected()" (change)="toggleAll()"></th>
              <th *ngFor="let column of columns">{{ column.label }}</th>
              <th class="actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of pagedRows()">
              <td class="select-cell">
                <input
                  class="form-check-input"
                  type="checkbox"
                  [attr.aria-label]="selectionLabel(row)"
                  [checked]="isSelected(row)"
                  (change)="toggleRow(row)">
              </td>
              <td *ngFor="let column of columns">
                <ng-container [ngSwitch]="column.type">
                  <app-status-pill *ngSwitchCase="'status'" [label]="cellValue(row, column.key)" [tone]="statusTone(cellValue(row, column.key))"></app-status-pill>
                  <app-status-pill *ngSwitchCase="'risk'" [label]="cellValue(row, column.key)" [tone]="riskTone(cellValue(row, column.key))"></app-status-pill>
                  <span *ngSwitchDefault>{{ cellValue(row, column.key) }}</span>
                </ng-container>
              </td>
              <td class="actions-cell">
                <button class="icon-button" type="button" [attr.aria-label]="'Open actions for ' + rowLabel(row)" (click)="rowAction.emit({ action: 'open', rows: [row] })"><app-icon name="more" [size]="16"></app-icon></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <app-empty-state *ngIf="!loading && !pagedRows().length" icon="search" title="No records found" description="Try a different search term or clear filters." actionLabel="Reset filters"></app-empty-state>

      <footer class="table-footer" *ngIf="!loading && filteredRows().length">
        <span>Showing {{ rangeStart() }}-{{ rangeEnd() }} of {{ filteredRows().length }}</span>
        <div>
          <button class="icon-button" type="button" aria-label="Previous page" [disabled]="page() === 1" (click)="page.set(page() - 1)">
            <app-icon name="chevron-left" [size]="16"></app-icon>
          </button>
          <button class="icon-button" type="button" aria-label="Next page" [disabled]="rangeEnd() >= filteredRows().length" (click)="page.set(page() + 1)">
            <app-icon name="chevron-right" [size]="16"></app-icon>
          </button>
        </div>
      </footer>
    </article>
  `,
  styleUrl: './enterprise-data-table.component.scss'
})
export class EnterpriseDataTableComponent<T> {
  @Input() eyebrow = 'Directory';
  @Input() title = 'Records';
  @Input() primaryAction = 'Add record';
  @Input() columns: TableColumn<T>[] = [];
  @Input() rows: T[] = [];
  @Input() loading = false;
  @Input() rowKey?: keyof T & string;
  @Input() selectionLabelKey?: keyof T & string;
  @Input() bulkActions: string[] = ['Export selected'];
  @Input() showExport = true;
  @Input() showFilters = true;
  @Output() exportClick = new EventEmitter<void>();
  @Output() primaryActionClick = new EventEmitter<void>();
  @Output() bulkAction = new EventEmitter<TableActionEvent<T>>();
  @Output() rowAction = new EventEmitter<TableActionEvent<T>>();

  readonly density = signal<'compact' | 'comfortable'>('comfortable');
  readonly page = signal(1);
  readonly selectedKeys = signal<Set<string>>(new Set());
  readonly pageSize = 6;
  searchTerm = '';

  setSearchTerm(term: string): void {
    this.searchTerm = term;
    this.page.set(1);
  }

  filteredRows(): T[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.rows;
    }

    return this.rows.filter(row =>
      Object.values(row as Record<string, unknown>).some(value => String(value).toLowerCase().includes(term)));
  }

  pagedRows(): T[] {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredRows().slice(start, start + this.pageSize);
  }

  cellValue(row: T, key: keyof T & string): string {
    return String((row as Record<string, unknown>)[key] ?? '');
  }

  selectedCount(): number {
    const selected = this.selectedKeys();
    return this.rows.filter(row => selected.has(this.keyFor(row))).length;
  }

  allVisibleSelected(): boolean {
    const visible = this.pagedRows();
    const selected = this.selectedKeys();
    return visible.length > 0 && visible.every(row => selected.has(this.keyFor(row)));
  }

  toggleAll(): void {
    const shouldSelect = !this.allVisibleSelected();
    this.selectedKeys.update(current => {
      const next = new Set(current);
      this.pagedRows().forEach(row => {
        const key = this.keyFor(row);
        if (shouldSelect) {
          next.add(key);
        } else {
          next.delete(key);
        }
      });
      return next;
    });
  }

  toggleRow(row: T): void {
    const key = this.keyFor(row);
    this.selectedKeys.update(current => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  isSelected(row: T): boolean {
    return this.selectedKeys().has(this.keyFor(row));
  }

  emitBulkAction(action: string): void {
    this.bulkAction.emit({ action, rows: this.selectedRows() });
  }

  rangeStart(): number {
    return Math.min((this.page() - 1) * this.pageSize + 1, this.filteredRows().length);
  }

  rangeEnd(): number {
    return Math.min(this.page() * this.pageSize, this.filteredRows().length);
  }

  statusTone(status: string): Tone {
    return ['Active', 'Good', 'Approved', 'On Time'].includes(status)
      ? 'success'
      : ['Remote', 'WFH'].includes(status)
        ? 'info'
        : ['On Leave', 'Warning', 'Pending', 'W-OFF', 'Leave', 'Penalty'].includes(status)
          ? 'warning'
          : status === 'Rejected'
            ? 'danger'
            : 'neutral';
  }

  riskTone(risk: string): Tone {
    return risk === 'Low' ? 'success' : risk === 'Medium' ? 'warning' : risk === 'High' ? 'danger' : 'neutral';
  }

  selectionLabel(row: T): string {
    return `Select ${this.rowLabel(row)}`;
  }

  rowLabel(row: T): string {
    if (this.selectionLabelKey) {
      return this.cellValue(row, this.selectionLabelKey);
    }

    if (this.rowKey) {
      return this.cellValue(row, this.rowKey);
    }

    return `row ${this.rows.indexOf(row) + 1}`;
  }

  private selectedRows(): T[] {
    const selected = this.selectedKeys();
    return this.rows.filter(row => selected.has(this.keyFor(row)));
  }

  private keyFor(row: T): string {
    if (this.rowKey) {
      return this.cellValue(row, this.rowKey);
    }

    return String(this.rows.indexOf(row));
  }
}
