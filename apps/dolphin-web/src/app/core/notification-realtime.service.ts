import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class NotificationRealtimeService {
  private connection?: signalR.HubConnection;

  start(accessToken: string): Promise<void> {
    const hubUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '4200'
      ? 'http://localhost:5154/hubs/notifications'
      : '/hubs/notifications';

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => accessToken })
      .withAutomaticReconnect()
      .build();

    return this.connection.start();
  }
}
