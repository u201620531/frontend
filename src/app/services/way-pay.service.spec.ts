import { TestBed } from '@angular/core/testing';

import { WayPayService } from './way-pay.service';

describe('WayPayService', () => {
  let service: WayPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WayPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
