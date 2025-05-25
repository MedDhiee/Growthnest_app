import { Component } from '@angular/core';
import { NotificationService } from '../../services/GestionMarketingServices/NotificationService.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  publicMessage: string = '';
  privateMessage: string = '';
  recipient: string = '';

  constructor(private notificationService: NotificationService) {}

  sendPublicMessage() {
    const message = {
      text: this.publicMessage,
      to: '' // Pas nécessaire pour les messages publics
    };
    this.notificationService.sendPublicMessage(message);
    this.publicMessage = '';
  }

  sendPrivateMessage() {
    if (!this.recipient) {
      console.warn('Recipient is required for private messages');
      return;
    }

    const message = {
      text: this.privateMessage,
      to: this.recipient
    };
    console.log("Sending private message:", message); 
    this.notificationService.sendPrivateMessage(message);
    this.privateMessage = '';
    this.recipient = '';
  }
}
