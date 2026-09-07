import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIconComponent } from './app-icon.component';

@Component({
  selector: 'app-toast-stack',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  animations: [
    trigger('toastMotion', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px) scale(.98)' }),
        animate('180ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('140ms ease-in', style({ opacity: 0, transform: 'translateY(8px) scale(.98)' }))
      ])
    ])
  ],
  template: `
    <div class="toast-stack" aria-live="polite">
      <article class="toast-card" @toastMotion>
        <app-icon name="sparkles" [size]="16"></app-icon>
        <div>
          <strong>Dolphin AI is ready</strong>
          <span>Authorized HR insights and onboarding prompts are available.</span>
        </div>
      </article>
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 40;
    }

    .toast-card {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      width: min(360px, calc(100vw - 32px));
      padding: 14px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text-primary);
      background: var(--color-surface);
      box-shadow: var(--shadow-md);
      backdrop-filter: blur(18px);
    }

    strong, span {
      display: block;
    }

    span {
      color: var(--color-text-secondary);
      font-size: .82rem;
    }

    @media (max-width: 760px) {
      .toast-stack {
        right: 12px;
        bottom: 12px;
        left: calc(var(--sidebar-compact-width) + 8px);
      }

      .toast-card {
        width: 100%;
      }
    }
  `]
})
export class ToastStackComponent {}
