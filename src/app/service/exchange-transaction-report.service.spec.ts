import { TestBed } from '@angular/core/testing';

import { ExchangeTransactionReportService } from './exchange-transaction-report.service';

describe('ExchangeTransactionReportService', () => {
  let service: ExchangeTransactionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeTransactionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
