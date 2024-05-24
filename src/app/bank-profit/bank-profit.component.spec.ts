import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankProfitComponent } from './bank-profit.component';

describe('BankProfitComponent', () => {
  let component: BankProfitComponent;
  let fixture: ComponentFixture<BankProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankProfitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
