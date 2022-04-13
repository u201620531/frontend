import { TestBed } from '@angular/core/testing';

import { SupportTableService } from './support-table.service';

describe('SupportTableService', () => {
  let service: SupportTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
