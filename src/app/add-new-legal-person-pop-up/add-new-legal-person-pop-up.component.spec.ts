import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLegalPersonPopUpComponent } from './add-new-legal-person-pop-up.component';

describe('AddNewLegalPersonPopUpComponent', () => {
  let component: AddNewLegalPersonPopUpComponent;
  let fixture: ComponentFixture<AddNewLegalPersonPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLegalPersonPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewLegalPersonPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
