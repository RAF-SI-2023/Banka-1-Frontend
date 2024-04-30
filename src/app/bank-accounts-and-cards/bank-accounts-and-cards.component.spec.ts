import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsAndCardsComponent } from './bank-accounts-and-cards.component';

describe('BankAccountsAndCardsComponent', () => {
  let component: BankAccountsAndCardsComponent;
  let fixture: ComponentFixture<BankAccountsAndCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountsAndCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankAccountsAndCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
