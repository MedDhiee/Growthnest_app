import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionMarketingRoutingModule } from '../GestionMarketing/gestion-marketing-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreateOffreComponent } from '../GestionMarketing/offres/create-offre/create-offre.component';


@NgModule({
  declarations: [
    CreateOffreComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GestionMarketingRoutingModule
  ]
})
export class GestionMarketingModule { }
