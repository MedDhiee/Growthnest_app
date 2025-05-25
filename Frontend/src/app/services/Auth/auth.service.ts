import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../../models/Auth/auth-response.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/Growthnest/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap(response => this.handleAuth(response))
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeUser();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token && !this.tokenService.isTokenExpired();
  }

  getCurrentUser(): User | null {
    return this.tokenService.getUser();
  }

  private handleAuth(response: AuthResponse): void {
    this.tokenService.saveToken(response.token);
    this.tokenService.saveUser(response.user);
  }
}