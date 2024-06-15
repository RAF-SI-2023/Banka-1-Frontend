import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSecurityOfferPopupComponent } from './public-security-offer-popup.component';

describe('PublicSecurityOfferPopupComponent', () => {
  let component: PublicSecurityOfferPopupComponent;
  let fixture: ComponentFixture<PublicSecurityOfferPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicSecurityOfferPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicSecurityOfferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
