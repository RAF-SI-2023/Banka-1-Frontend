import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPersonsComponent } from './legal-persons.component';

describe('LegalPersonsComponent', () => {
  let component: LegalPersonsComponent;
  let fixture: ComponentFixture<LegalPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalPersonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
