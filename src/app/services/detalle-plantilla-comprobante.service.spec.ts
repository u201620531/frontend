import { TestBed } from '@angular/core/testing';

import { DetallePlantillaComprobanteService } from './detalle-plantilla-comprobante.service';

describe('DetallePlantillaComprobanteService', () => {
  let service: DetallePlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallePlantillaComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
