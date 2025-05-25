import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from '../../models/GestionMarketingModels/offre.model';
import { TokenService } from '../Auth/token.service'; // Service d'authentification

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:8080/Growthnest/offres';

  constructor(
    private http: HttpClient,
    private authService: TokenService // Injection du service d'authentification
  ) {}

  // Méthode privée pour créer les headers avec le token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer toutes les offres
  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/retrieveAllOffres`, {
      headers: this.getHeaders()
    });
  }

  // Récupérer une offre par son ID
  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/retrieveOffre/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Créer une nouvelle offre
  createOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}/addOffre`, offre, {
      headers: this.getHeaders()
    });
  }

  // Mettre à jour une offre existante
  updateOffre(id: number, offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/updateOffre/${id}`, offre, {
      headers: this.getHeaders()
    });
  }

  // Supprimer une offre
  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteOffre/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Récupérer les offres de l'utilisateur courant
  getMyOffers(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/myOffers`, {
      headers: this.getHeaders()
    });
  }
}