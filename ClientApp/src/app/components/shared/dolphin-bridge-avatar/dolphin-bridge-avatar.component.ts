import { Component, Input } from '@angular/core';

export type PresenceStatus = 'office' | 'remote' | 'leave' | 'offline';

@Component({
  selector: 'app-dolphin-bridge-avatar',
  templateUrl: './dolphin-bridge-avatar.component.html',
  styleUrl: './dolphin-bridge-avatar.component.css'
})
export class DolphinBridgeAvatarComponent {
  @Input() name: string = 'User';
  @Input() presence: PresenceStatus = 'office';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() clockedInTime?: string;
  @Input() roleTitle?: string;

  get initials(): string {
    if (!this.name) return 'U';
    const parts = this.name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  get statusLabel(): string {
    switch (this.presence) {
      case 'office': return 'Office (Present)';
      case 'remote': return 'Remote Session';
      case 'leave': return 'On Leave / PTO';
      default: return 'Offline';
    }
  }

  get statusColor(): string {
    switch (this.presence) {
      case 'office': return '#10b981';
      case 'remote': return '#8b5cf6';
      case 'leave': return '#ef4444';
      default: return '#94a3b8';
    }
  }
}
