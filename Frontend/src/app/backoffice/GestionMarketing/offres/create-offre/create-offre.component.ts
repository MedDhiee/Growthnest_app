import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Offre } from 'src/app/models/GestionMarketingModels/offre.model';
import { OffreService } from 'src/app/services/GestionMarketingServices/offre.service';

@Component({
  selector: 'app-create-offre',
  templateUrl: './create-offre.component.html',
  styleUrls: ['./create-offre.component.scss']
})
export class CreateOffreComponent implements OnInit {
  formOffre!: FormGroup;
  existingTypes: string[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadExistingTypes();
  }

  initForm(): void {
    this.formOffre = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      typeOffre: ['', Validators.required]
    });
  }

  loadExistingTypes(): void {
    this.isLoading = true;
    this.offreService.getAllOffres().subscribe({
      next: (offres) => {
        // Extraire tous les types uniques existants
        this.existingTypes = [...new Set(offres.map(offre => String(offre.typeOffre)))];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading offers', err);
        this.isLoading = false;
      }
    });
  }

  submitOffre(): void {
    if (this.formOffre.valid) {
      this.isLoading = true;
      const offreData = this.formOffre.value;
      
      this.offreService.createOffre(offreData).subscribe({
        next: () => {
          alert("Offer created successfully!");
          this.formOffre.reset();
          this.loadExistingTypes(); // Recharger les types disponibles
        },
        error: (err) => {
          console.error('Error creating offer', err);
          alert("Error creating offer. Please try again.");
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}