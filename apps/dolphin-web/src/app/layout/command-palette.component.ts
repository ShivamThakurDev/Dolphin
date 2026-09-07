import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { COMMAND_ACTIONS } from '../core/navigation.registry';
import { AppIconComponent } from '../shared/app-icon.component';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  animations: [
    trigger('panelMotion', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px) scale(.98)' }),
        animate('160ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('120ms ease-in', style({ opacity: 0, transform: 'translateY(-8px) scale(.98)' }))
      ])
    ])
  ],
  template: `
    <div class="palette-backdrop" *ngIf="open" (click)="close.emit()">
      <section class="palette surface" @panelMotion role="dialog" aria-modal="true" aria-label="Command palette" (click)="$event.stopPropagation()">
        <label class="palette-search">
          <app-icon name="search" [size]="18"></app-icon>
          <input #searchInput type="search" placeholder="Search actions or ask for help" autofocus>
          <kbd class="command-key">Esc</kbd>
        </label>

        <div class="palette-section">
          <p class="eyebrow">Quick actions</p>
          <button
            #actionButton
            *ngFor="let action of actions; let i = index"
            type="button"
            [class.active]="activeIndex() === i"
            (mouseenter)="activeIndex.set(i)"
            (click)="choose(i)">
            <span><app-icon [name]="action.icon" [size]="18"></app-icon></span>
            <strong>{{ action.label }}</strong>
            <small>{{ action.description }}</small>
          </button>
        </div>

        <footer>
          <span>Navigate <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select <kbd>↵</kbd></span>
        </footer>
      </section>
    </div>
  `,
  styles: [`
    .palette-backdrop {
      position: fixed;
      inset: 0;
      z-index: 80;
      display: grid;
      place-items: start center;
      padding: 10px 18px;
      background: rgba(15, 23, 42, .18);
      backdrop-filter: blur(4px);
    }

    .palette {
      width: min(760px, 100%);
      overflow: hidden;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      box-shadow: var(--shadow-lg);
    }

    .palette-search {
      height: 64px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 20px;
      border-bottom: 1px solid var(--color-border);
    }

    .palette-search input {
      flex: 1;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--color-text);
      font-size: 1.05rem;
    }

    .palette-section {
      display: grid;
      gap: 4px;
      padding: 18px 10px;
    }

    .palette-section .eyebrow {
      padding: 0 14px;
    }

    .palette-section button {
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 2px 12px;
      align-items: center;
      border: 0;
      border-radius: var(--radius-md);
      background: transparent;
      padding: 12px 14px;
      text-align: left;
      color: var(--color-text);
    }

    .palette-section button:hover,
    .palette-section button:focus-visible,
    .palette-section button.active {
      background: var(--color-surface-subtle);
    }

    .palette-section button span {
      grid-row: span 2;
      color: var(--color-brand-600);
    }

    .palette-section small {
      color: var(--color-text-muted);
    }

    footer {
      display: flex;
      justify-content: flex-end;
      gap: 24px;
      padding: 12px 18px;
      border-top: 1px solid var(--color-border);
      background: var(--color-surface-subtle);
      color: var(--color-text-muted);
      font-size: .82rem;
    }

    footer kbd {
      margin-inline: 2px;
      border-radius: 6px;
      border: 1px solid var(--color-border);
      background: var(--color-surface-solid);
      color: var(--color-text);
    }
  `]
})
export class CommandPaletteComponent {
  private isOpen = false;
  private restoreFocusTo?: HTMLElement;

  @Input()
  set open(value: boolean) {
    this.isOpen = value;
    if (value) {
      this.restoreFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
      window.setTimeout(() => this.searchInput?.nativeElement.focus());
    } else {
      this.restoreFocusTo?.focus();
      this.restoreFocusTo = undefined;
      this.activeIndex.set(0);
    }
  }

  get open(): boolean {
    return this.isOpen;
  }

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();
  @ViewChild('searchInput') private readonly searchInput?: ElementRef<HTMLInputElement>;
  @ViewChildren('actionButton') private readonly actionButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  readonly activeIndex = signal(0);
  readonly actions = COMMAND_ACTIONS;

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.open) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close.emit();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const next = (this.activeIndex() + direction + this.actions.length) % this.actions.length;
      this.activeIndex.set(next);
      this.actionButtons?.get(next)?.nativeElement.focus();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.choose(this.activeIndex());
    }
  }

  choose(index: number): void {
    this.select.emit(this.actions[index].targetRoute);
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusable: HTMLElement[] = [];
    if (this.searchInput?.nativeElement) {
      focusable.push(this.searchInput.nativeElement);
    }
    this.actionButtons?.forEach(button => focusable.push(button.nativeElement));

    if (!focusable.length) {
      return;
    }

    const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);
    const nextIndex = event.shiftKey
      ? (activeIndex <= 0 ? focusable.length - 1 : activeIndex - 1)
      : (activeIndex === focusable.length - 1 ? 0 : activeIndex + 1);

    event.preventDefault();
    focusable[nextIndex]?.focus();
  }
}
