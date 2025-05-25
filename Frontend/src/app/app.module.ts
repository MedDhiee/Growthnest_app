import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';


import { ListOffresComponent } from './backoffice/GestionMarketing/offres/list-offres/list-offres.component';
import { OffreDetailsComponent } from './backoffice/GestionMarketing/offres/offre-details/offre-details.component';
import { MailingComponent } from './backoffice/GestionMarketing/mailing/mailing/mailing.component';
import { EditOffreModalComponent } from './backoffice/GestionMarketing/offres/edit-offre-modal/edit-offre-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ListOffresComponent,
    OffreDetailsComponent,
    MailingComponent,
    EditOffreModalComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
