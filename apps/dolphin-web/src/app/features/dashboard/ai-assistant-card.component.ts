import { Component } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';

@Component({
  selector: 'app-ai-assistant-card',
  standalone: true,
  imports: [AppIconComponent],
  template: `
    <article class="ai-card glass-panel">
      <div class="ai-orb"><app-icon name="sparkles" [size]="22"></app-icon></div>
      <p class="eyebrow">Dolphin AI</p>
      <h2>Ask what needs attention today.</h2>
      <p class="body-small">Review authorized HR insights, attendance exceptions and onboarding progress in one guided assistant.</p>
      <div class="prompts">
        <button type="button">Show leave conflicts</button>
        <button type="button">Summarize HR inbox</button>
      </div>
    </article>
  `,
  styles: [`
    .ai-card {
      position: relative;
      overflow: hidden;
      min-height: 260px;
      display: grid;
      align-content: end;
      gap: 10px;
      padding: 22px;
      border-radius: var(--radius-xl);
    }

    .ai-card::before {
      position: absolute;
      top: -60px;
      right: -80px;
      width: 220px;
      height: 220px;
      content: "";
      border-radius: 50%;
      background: radial-gradient(circle, rgba(18, 168, 181, .28), transparent 68%);
    }

    .ai-orb {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border-radius: 16px;
      color: white;
      background: linear-gradient(135deg, var(--color-brand-500), var(--color-accent-cyan));
      box-shadow: var(--shadow-glow);
    }

    h2 {
      max-width: 320px;
      margin: 0;
      font-size: 1.4rem;
      font-weight: 790;
    }

    .prompts {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }

    button {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-pill);
      background: var(--color-surface-solid);
      color: var(--color-text-primary);
      padding: 7px 10px;
      font-size: .78rem;
      font-weight: 700;
    }
  `]
})
export class AiAssistantCardComponent {}
