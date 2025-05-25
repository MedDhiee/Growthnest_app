import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { TokenService } from '../Auth/token.service';

export interface Message {
  id: number;
  text: string;
  to: string;
  createdAt: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient!: Client;
  private messageSubject = new Subject<Message>();
  private connected = false;
  private readonly WS_URL = 'http://localhost:8080/Growthnest/ws';
  private readonly API_URL = 'http://localhost:8080/Growthnest/notifications';

  constructor(private http: HttpClient,
      private authService: TokenService) {
    this.initializeWebSocketConnection();
    
  }

  private getHeaders(): HttpHeaders {
      const token = this.authService.getToken();
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
  private initializeWebSocketConnection() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('Token JWT manquant');
      return;
    }
    

    const socket = new SockJS(`${this.WS_URL}?token=${encodeURIComponent(token)}`);

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: str => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = () => {
      this.connected = true;
      console.log('STOMP connecté');

      this.stompClient.subscribe('/user/queue/specific', (message: IMessage) => {
        console.log('Message reçu :', message.body);
        this.messageSubject.next(JSON.parse(message.body));
      });
    };

    this.stompClient.onStompError = frame => {
      console.error('Erreur STOMP :', frame.headers['message']);
    };

    this.stompClient.activate();
  }

  public sendPublicMessage(message: any) {
    if (this.connected) {
      this.stompClient.publish({
        destination: '/app/application',
        body: JSON.stringify(message)
      });
    }
  }

  public sendPrivateMessage(message: any) {
    if (this.connected) {
      this.stompClient.publish({
        destination: '/app/private',
        body: JSON.stringify(message)
      });
    }
  }

  public getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  public fetchStoredNotifications(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/${username}`, {
      headers: this.getHeaders()
    });
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
