import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Card {
  id: number;
  typeOffre: string;
  nom: string;
  description: string;
  prix: number;
  createdBy: string; // Email du créateur
}

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']
})
export class OffreDetailsComponent implements OnInit {
  @Input() card!: Card;
  isMarketingAgent: boolean = false; // Variable locale pour vérifier le rôle

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role'); // Récupérer le rôle depuis le localStorage
    this.isMarketingAgent = (role === 'MarketingAgent');
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'TND' 
    }).format(price);
  }
}
