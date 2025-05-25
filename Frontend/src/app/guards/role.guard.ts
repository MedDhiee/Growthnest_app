import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: any): boolean {
    const expectedRole = route.data['expectedRole'];
    const user = this.authService.getCurrentUser();
    
    if (this.authService.isAuthenticated() && user?.role === expectedRole) {
      return true;
    }
    
    this.router.navigate(['/unauthorized']);
    return false;
  }
}