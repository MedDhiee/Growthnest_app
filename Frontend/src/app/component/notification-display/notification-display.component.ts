import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, NotificationService } from '../../services/GestionMarketingServices/NotificationService.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractService } from 'src/app/services/GestionMarketingServices/contract.service';

@Component({
  selector: 'app-notification-display',
  templateUrl: './notification-display.component.html',
  styleUrls: ['./notification-display.component.scss']
})
export class NotificationDisplayComponent implements OnInit {
  @ViewChild('contractModal') contractModal!: TemplateRef<any>;
  notifications: any[] = [];
  unreadCount = 0;
  userRole: string = '';
  contractForm: FormGroup;
  selectedNotification: any;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly fb: FormBuilder,
    private contractService: ContractService,
    private readonly modalService: NgbModal
  ) {
    this.contractForm = this.fb.group({
      clientName: ['', Validators.required],
      contractType: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      terms: ['']
    });
  }

  ngOnInit(): void {
    const currentUserData = localStorage.getItem('auth_user') ?? '';
    const currentUser = JSON.parse(currentUserData);
    this.userRole = currentUser.role?.name || '';
    const userEmail = currentUser.email;
    
    // Récupérer les notifications existantes
    this.notificationService.fetchStoredNotifications(userEmail).subscribe(data => {
      this.notifications = data;
      this.unreadCount = this.notifications.filter(n => !n.read).length;
    });
    
    this.notificationService.getMessages().subscribe((msg: Message) => {
      this.notifications.unshift(msg);
      this.unreadCount++;
    });
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.unreadCount = 0;
  }

  openContractForm(notification: any): void {
    this.selectedNotification = notification;
    const clientEmail = this.extractClientNameFromNotification(notification.text);
    
    this.contractForm.patchValue({
      clientName: clientEmail,
      // ... other fields
    });
    
    // Open modal using the template reference
    this.modalService.open(this.contractModal);
  }
  generateContract(modal: any): void {
    if (this.contractForm.valid) {
      const formData = this.contractForm.value;
      const clientEmail = formData.clientName;
  
      this.contractService.generateContract({
        clientEmail: clientEmail,
        contractType: formData.contractType,
        startDate: formData.startDate,
        durationMonths: formData.duration,
        terms: formData.terms
      }).subscribe({
        next: (pdfBlob: Blob) => {
          const blob = new Blob([pdfBlob], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'contract.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
  
          // ✅ Notification envoyée au client
          this.notificationService.sendPrivateMessage({
            text: `Un contrat a été généré pour vous. Veuillez vérifier votre boîte mail.`,
            to: clientEmail
          });
  
          modal.close();
          this.contractForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de la génération du contrat:', err);
          alert('Erreur lors de la génération du contrat.');
        }
      });
    }
  }
  
    private extractClientNameFromNotification(text: string): string {
    // Solution 1: Split sur le premier espace
  const email = text.split(' ')[0];
  return email;
  }
}