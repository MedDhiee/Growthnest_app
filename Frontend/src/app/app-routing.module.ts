import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthComponent } from './component/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const Approutes: Routes = [
  {
    
    path: '',
    component: FullComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      
      {
        path: 'dashboard',
        
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'Marketing',
        loadChildren: () =>
          import('./backoffice/gestion-marketing/gestion-marketing.module').then(
            (m) => m.GestionMarketingModule
          ),
      },
      
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'auth', component: AuthComponent,canActivate: [AuthGuard] // Empêche l'accès si déjà connecté
        },
  {
    path: '**',
    redirectTo: '/starter'
  },
  
];
