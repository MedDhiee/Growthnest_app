import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeOffre } from '../../models/GestionMarketingModels/type-offre.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOffreService {
  private apiUrl = 'http://localhost:8080/api/types';

  constructor(private http: HttpClient) {}

  createTypeOffre(type: TypeOffre): Observable<TypeOffre> {
    return this.http.post<TypeOffre>(this.apiUrl, type);
  }

  getAllTypes(): Observable<TypeOffre[]> {
    return this.http.get<TypeOffre[]>(this.apiUrl);
  }
}
