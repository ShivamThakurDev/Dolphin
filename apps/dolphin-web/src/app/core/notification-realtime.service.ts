import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class NotificationRealtimeService {
  private connection?: signalR.HubConnection;

  start(accessToken: string): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5154/hubs/notifications', { accessTokenFactory: () => accessToken })
      .withAutomaticReconnect()
      .build();

    return this.connection.start();
  }
}
