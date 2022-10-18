import { TestBed } from '@angular/core/testing';

import { CorrelativoPlantillaComprobanteService } from './correlativo-plantilla-comprobante.service';

describe('CorrelativoPlantillaComprobanteService', () => {
  let service: CorrelativoPlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrelativoPlantillaComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
