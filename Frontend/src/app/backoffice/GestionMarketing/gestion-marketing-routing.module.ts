import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOffreComponent } from './offres/create-offre/create-offre.component';
import { ListOffresComponent } from './offres/list-offres/list-offres.component';
import { MailingComponent } from './mailing/mailing/mailing.component';


const routes: Routes = [
  { path: 'createOffre', component: CreateOffreComponent },
  { path: 'listOffres', component: ListOffresComponent },
  { path: 'mailing', component: MailingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMarketingRoutingModule {}
