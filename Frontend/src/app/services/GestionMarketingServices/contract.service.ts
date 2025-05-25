// contract.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../Auth/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly apiUrl = 'http://localhost:8080/Growthnest/api/contracts';

  constructor(
    private readonly http: HttpClient, 
    private readonly tokenService: TokenService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  generateContract(contractData: any) {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, contractData, { headers, responseType: 'blob' });
  }
  downloadContract(pdfPath: string): Observable<Blob> {
    return this.http.get(pdfPath, {
      responseType: 'blob',
      headers: this.getHeaders()
    });
  }
}