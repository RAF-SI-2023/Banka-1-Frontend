import { TestBed } from '@angular/core/testing';

import { OtcService } from './otc.service';

describe('OtcService', () => {
  let service: OtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
