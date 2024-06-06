import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeTransactionReportComponent } from './exchange-transaction-report.component';

describe('ExchangeTransactionReportComponent', () => {
  let component: ExchangeTransactionReportComponent;
  let fixture: ComponentFixture<ExchangeTransactionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeTransactionReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
