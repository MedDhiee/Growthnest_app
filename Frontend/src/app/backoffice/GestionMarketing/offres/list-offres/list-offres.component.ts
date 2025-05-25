import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OffreDetailsComponent } from '../offre-details/offre-details.component';
import { OffreService } from '../../../../services/GestionMarketingServices/offre.service';
import { Offre } from '../../../../models/GestionMarketingModels/offre.model';
import { EditOffreModalComponent } from '../edit-offre-modal/edit-offre-modal.component';
import { NotificationService } from 'src/app/services/GestionMarketingServices/NotificationService.service';

@Component({
  selector: 'app-list-offres',
  templateUrl: './list-offres.component.html',
  styleUrls: ['./list-offres.component.scss']
})
export class ListOffresComponent implements OnInit {
  cards: Offre[] = [];
  isLoading = true;
  errorMessage = '';
  userRole: string = '';
  selectedCard: Offre | null = null;
  @ViewChild('orderConfirmationModal') orderConfirmationModal!: TemplateRef<any>;
  searchTerm: string = '';
  selectedType: string = '';
  constructor(
    private modalService: NgbModal,
    private offreService: OffreService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUserRoleFromLocalStorage();

    this.loadOffres();
  }

  getUserRoleFromLocalStorage(): void {
    const userDataString = localStorage.getItem('auth_user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.userRole = userData.role?.name || '';
    }
  }

  loadOffres(): void {
    this.isLoading = true;

    if (this.userRole === 'MarketingAgent') {
      this.offreService.getMyOffers().subscribe({
        next: (offres: Offre[]) => {
          this.cards = offres;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.handleError(err);
        }
      });
    } else {
      this.offreService.getAllOffres().subscribe({
        next: (offres: Offre[]) => {
          this.cards = offres;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.handleError(err);
        }
      });
    }
  }

  private handleError(err: any): void {
    this.errorMessage = 'Failed to load offers. Please try again later.';
    console.error('Error loading offers:', err);
    this.isLoading = false;

    if (err.status === 401) {
      this.errorMessage = 'Your session has expired. Please log in again.';
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 2
    }).format(price);
  }

  editCard(card: Offre): void {
    const modalRef = this.modalService.open(EditOffreModalComponent);
    modalRef.componentInstance.offre = { ...card };

    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.loadOffres();
      }
    }).catch((err) => {
      console.log('Modal dismissed:', err);
    });
  }

  deleteCard(cardId: number) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offreService.deleteOffre(cardId).subscribe({
        next: () => {
          this.cards = this.cards.filter(card => card.id !== cardId);
        },
        error: (err: any) => {
          console.error('Error deleting offer:', err);
          alert('Failed to delete offer. Please try again.');
        }
      });
    }
  }

  showDetails(card: Offre) {
    const modalRef = this.modalService.open(OffreDetailsComponent);
    modalRef.componentInstance.card = card;
  }

  get filteredCards(): Offre[] {
    return this.cards.filter(card => {
      const matchesSearch = card.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.selectedType ? card.typeOffre === this.selectedType : true;
      return matchesSearch && matchesType;
    });
  }

  get uniqueTypes(): string[] {
    return [...new Set(this.cards.map(card => card.typeOffre))];
  }
  confirmOrder(card: Offre): void {
    this.selectedCard = card;
    this.modalService.open(this.orderConfirmationModal);
  }

  // Fonction appelée quand l'utilisateur clique sur une carte
  selectCard(offre: Offre): void {
    this.selectedCard = offre;
  }

  // Fonction pour passer une commande
  placeOrder(): void {
    if (this.selectedCard) {
      const currentUserData = localStorage.getItem('auth_user');

      if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        const userEmail = currentUser.email;

        const privateMessage = {
          text: `${userEmail} a confirmé une commande pour l'offre : ${this.selectedCard.nom}`,
          to: this.selectedCard.createdBy
        };

        this.notificationService.sendPrivateMessage(privateMessage);
      }
    }
  }
}
  

