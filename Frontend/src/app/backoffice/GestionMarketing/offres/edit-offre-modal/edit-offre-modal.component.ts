import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OffreService } from '../../../../services/GestionMarketingServices/offre.service';
import { Offre } from '../../../../models/GestionMarketingModels/offre.model';

@Component({
  selector: 'app-edit-offre-modal',
  templateUrl: './edit-offre-modal.component.html',
  styleUrls: ['./edit-offre-modal.component.scss']
})
export class EditOffreModalComponent {
  @Input()
  offre!: Offre;
  isSaving = false;

  constructor(
    public activeModal: NgbActiveModal,
    private offreService: OffreService
  ) {}

  saveChanges(): void {
    this.isSaving = true;
    if (this.offre.id !== undefined) {
      this.offreService.updateOffre(this.offre.id, this.offre).subscribe({
      next: () => {
        this.activeModal.close('saved');
      },
      error: (err) => {
        console.error('Error updating offer:', err);
        alert('Failed to update offer. Please try again.');
        this.isSaving = false;
      }});
    } else {
      console.error('Offre ID is undefined. Cannot update offer.');
      alert('Failed to update offer. Please ensure the offer has a valid ID.');
      this.isSaving = false;
    }
   
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}