// mail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GmailAccount, Mail } from 'src/app/models/GestionMarketingModels/mail.model';

@Injectable({ providedIn: 'root' })
export class MailService {
  private readonly CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  private readonly API_URL = 'https://gmail.googleapis.com';

  currentAccount = new BehaviorSubject<GmailAccount|null>(null);
  mails = new BehaviorSubject<Mail[]>([]);

  constructor(private http: HttpClient) {}

  async connectGmail() {
    // Implémentation OAuth2
    const authResult = await this.authenticateGoogle();
    this.currentAccount.next({
      email: authResult.email,
      picture: authResult.picture,
      accessToken: authResult.access_token
    });
    this.loadEmails();
  }

  private async authenticateGoogle(): Promise<any> {
    return new Promise((resolve) => {
      // Implémentation réelle utiliserait Google Identity Services
      console.log("Simulating Google OAuth...");
      setTimeout(() => {
        resolve({
          email: "user@gmail.com",
          picture: "https://picsum.photos/200",
          access_token: "simulated_token"
        });
      }, 1000);
    });
  }

  async loadEmails() {
    if (!this.currentAccount.value) return;
    
    // Simulation d'appel API
    setTimeout(() => {
      this.mails.next([
        {
          id: '1',
          from: 'contact@company.com',
          subject: 'Votre compte a été créé',
          snippet: 'Merci pour votre inscription à notre service...',
          date: new Date(),
          read: false
        }
        // ... autres emails
      ]);
    }, 500);
  }
}