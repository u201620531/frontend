import { TestBed } from '@angular/core/testing';

import { TipoCambioService } from './tipo-cambio.service';

describe('TipoCambioService', () => {
  let service: TipoCambioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCambioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
