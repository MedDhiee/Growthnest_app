import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOffreModalComponent } from './edit-offre-modal.component';

describe('EditOffreModalComponent', () => {
  let component: EditOffreModalComponent;
  let fixture: ComponentFixture<EditOffreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOffreModalComponent]
    });
    fixture = TestBed.createComponent(EditOffreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
