import { TestBed } from '@angular/core/testing';

import { TipoCambioService } from './tipo-cambio.service';
import { HttpClientModule } from '@angular/common/http';

describe('TipoCambioService', () => {
  let service: TipoCambioService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(TipoCambioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
