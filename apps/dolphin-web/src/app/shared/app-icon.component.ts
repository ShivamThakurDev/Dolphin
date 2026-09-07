import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  LucideActivity,
  LucideArchive,
  LucideBell,
  LucideBotMessageSquare,
  LucideBriefcaseBusiness,
  LucideCalendarDays,
  LucideChartNoAxesCombined,
  LucideCheck,
  LucideChevronLeft,
  LucideChevronRight,
  LucideClock,
  LucideCommand,
  LucideDollarSign,
  LucideDownload,
  LucideFileText,
  LucideFilter,
  LucideHome,
  LucideInbox,
  LucideLayoutDashboard,
  LucideMenu,
  LucideMoon,
  LucideMoreHorizontal,
  LucidePlus,
  LucideSearch,
  LucideSend,
  LucideSettings,
  LucideShield,
  LucideSparkles,
  LucideSun,
  LucideUpload,
  LucideUser,
  LucideUsers,
  LucideWorkflow,
  LucideX
} from '@lucide/angular';
import { IconName } from './ui-models';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    CommonModule,
    LucideActivity,
    LucideArchive,
    LucideBell,
    LucideBotMessageSquare,
    LucideBriefcaseBusiness,
    LucideCalendarDays,
    LucideChartNoAxesCombined,
    LucideCheck,
    LucideChevronLeft,
    LucideChevronRight,
    LucideClock,
    LucideCommand,
    LucideDollarSign,
    LucideDownload,
    LucideFileText,
    LucideFilter,
    LucideHome,
    LucideInbox,
    LucideLayoutDashboard,
    LucideMenu,
    LucideMoon,
    LucideMoreHorizontal,
    LucidePlus,
    LucideSearch,
    LucideSend,
    LucideSettings,
    LucideShield,
    LucideSparkles,
    LucideSun,
    LucideUpload,
    LucideUser,
    LucideUsers,
    LucideWorkflow,
    LucideX
  ],
  template: `
    <ng-container [ngSwitch]="name">
      <svg *ngSwitchCase="'activity'" lucideActivity [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'archive'" lucideArchive [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'bell'" lucideBell [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'bot'" lucideBotMessageSquare [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'briefcase'" lucideBriefcaseBusiness [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'calendar'" lucideCalendarDays [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'chart'" lucideChartNoAxesCombined [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'check'" lucideCheck [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'chevron-left'" lucideChevronLeft [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'chevron-right'" lucideChevronRight [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'clock'" lucideClock [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'command'" lucideCommand [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'dollar'" lucideDollarSign [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'download'" lucideDownload [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'file'" lucideFileText [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'filter'" lucideFilter [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'home'" lucideHome [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'inbox'" lucideInbox [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'layout'" lucideLayoutDashboard [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'menu'" lucideMenu [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'moon'" lucideMoon [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'more'" lucideMoreHorizontal [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'plus'" lucidePlus [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'search'" lucideSearch [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'send'" lucideSend [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'settings'" lucideSettings [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'shield'" lucideShield [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'sparkles'" lucideSparkles [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'sun'" lucideSun [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'upload'" lucideUpload [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'user'" lucideUser [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'users'" lucideUsers [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchCase="'workflow'" lucideWorkflow [attr.width]="size" [attr.height]="size"></svg>
      <svg *ngSwitchDefault lucideX [attr.width]="size" [attr.height]="size"></svg>
    </ng-container>
  `,
  styles: [`
    :host {
      display: inline-grid;
      place-items: center;
      line-height: 0;
    }

    svg {
      stroke-width: 2;
    }
  `]
})
export class AppIconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 18;
}
