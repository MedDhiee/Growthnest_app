import { Component } from '@angular/core';
import { MailService } from '../../../../services/GestionMarketingServices/mailing.service';
@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent {

  constructor(public mailService: MailService) {}

  connectGmail() {
    this.mailService.connectGmail();
  }

  logout() {
    this.mailService.currentAccount.next(null);
  }
}