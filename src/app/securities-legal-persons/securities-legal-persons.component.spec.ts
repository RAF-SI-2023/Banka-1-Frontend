import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritiesLegalPersonsComponent } from './securities-legal-persons.component';

describe('SecuritiesLegalPersonsComponent', () => {
  let component: SecuritiesLegalPersonsComponent;
  let fixture: ComponentFixture<SecuritiesLegalPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritiesLegalPersonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecuritiesLegalPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
