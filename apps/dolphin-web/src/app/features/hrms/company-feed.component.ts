import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppIconComponent } from '../../shared/app-icon.component';
import { StatusPillComponent } from '../../shared/status-pill.component';
import { HrmsDemoDataService } from './hrms-demo-data.service';

@Component({
  selector: 'app-company-feed',
  standalone: true,
  imports: [CommonModule, AppIconComponent, StatusPillComponent],
  template: `
    <section class="feed-page">
      <aside class="feed-rail">
        <article class="surface rail-card">
          <h2 class="section-title">Working remotely</h2>
          <div class="avatar-stack">
            <span>Anjali</span>
            <span>Sudhir</span>
          </div>
        </article>
        <article class="surface rail-card quick-links">
          <p class="eyebrow">Quick links</p>
          <strong>No quick links are added</strong>
        </article>
        <article class="surface rail-card">
          <h2 class="section-title">Feedbacks received</h2>
          <p><strong>1</strong> feedback from others.</p>
          <button class="btn btn-primary btn-sm" type="button">Request Feedback</button>
        </article>
      </aside>

      <main class="feed-stream">
        <header class="surface composer">
          <button class="profile-dot" type="button">S</button>
          <button class="composer-button" type="button">Share an announcement, praise, or update...</button>
          <button class="btn btn-primary btn-sm" type="button"><app-icon name="send" [size]="15"></app-icon> Post</button>
        </header>

        <article class="surface post-card" *ngFor="let post of data.feedPosts().data">
          <header>
            <span class="profile-dot">{{ post.author[0] }}</span>
            <div>
              <strong>{{ post.author }}</strong>
              <small>{{ post.role }} · {{ post.age }}</small>
            </div>
            <button class="icon-button" type="button" aria-label="Open post actions"><app-icon name="more" [size]="16"></app-icon></button>
          </header>
          <p>{{ post.body }}</p>
          <div class="post-creative" *ngIf="post.imageTitle">
            <span>{{ post.imageTitle }}</span>
            <small>Recognition template</small>
          </div>
          <footer>
            <button type="button"><app-icon name="check" [size]="15"></app-icon> Like</button>
            <button type="button"><app-icon name="inbox" [size]="15"></app-icon> Comment</button>
            <span>{{ post.reactions }} reactions · {{ post.comments }} comments</span>
          </footer>
        </article>
      </main>

      <aside class="notification-shell surface">
        <div class="notice-icon"><app-icon name="bell" [size]="22"></app-icon></div>
        <div>
          <h2>Enable notifications</h2>
          <p>Receive important workflow approvals, payroll alerts and feed updates from Dolphin.</p>
        </div>
        <div class="notice-actions">
          <button class="btn btn-light btn-sm" type="button">Not Now</button>
          <button class="btn btn-primary btn-sm" type="button">Enable</button>
        </div>
      </aside>
    </section>
  `,
  styleUrl: './hrms-workspaces.scss'
})
export class CompanyFeedComponent {
  readonly data = inject(HrmsDemoDataService);
}
