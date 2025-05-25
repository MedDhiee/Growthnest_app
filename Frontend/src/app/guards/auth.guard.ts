import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Si l'utilisateur est déjà authentifié, redirigez-le vers la page d'accueil
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}