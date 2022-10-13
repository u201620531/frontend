import { TestBed } from '@angular/core/testing';

import { ComprobanteService } from './comprobante.service';
import { HttpClientModule } from '@angular/common/http';

describe('ComprobanteService', () => {
  let service: ComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
