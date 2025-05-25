import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/Auth/auth.service';
import { TokenService } from '../services/Auth/token.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { AuthComponent } from './auth/auth.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationDisplayComponent } from './notification-display/notification-display.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    NotificationComponent,
    NotificationDisplayComponent
  ],
  providers: [
    AuthService,
    TokenService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class ComponentsModule { }
