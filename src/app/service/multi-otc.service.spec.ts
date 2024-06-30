import { TestBed } from '@angular/core/testing';

import { MultiOtcService } from './multi-otc.service';

describe('MultiOtcService', () => {
  let service: MultiOtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiOtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
