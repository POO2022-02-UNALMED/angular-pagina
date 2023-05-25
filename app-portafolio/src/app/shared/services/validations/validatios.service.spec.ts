import { TestBed } from '@angular/core/testing';

import { ValidationsService } from './validations.service';

describe('ValidatiosService', () => {
  let service: ValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
