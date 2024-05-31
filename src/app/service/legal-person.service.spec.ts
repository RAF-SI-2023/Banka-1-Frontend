import { TestBed } from '@angular/core/testing';

import { LegalPersonService } from './legal-person.service';

describe('LegalPersonService', () => {
  let service: LegalPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
