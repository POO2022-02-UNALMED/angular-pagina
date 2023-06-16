import { TestBed } from '@angular/core/testing';

import { HideModalService } from './hide-modal.service';

describe('HideModalService', () => {
  let service: HideModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
