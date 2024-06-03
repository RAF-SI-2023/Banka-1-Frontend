import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStockPopupComponent } from './buy-stock-popup.component';

describe('BuyStockPopupComponent', () => {
  let component: BuyStockPopupComponent;
  let fixture: ComponentFixture<BuyStockPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyStockPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyStockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
