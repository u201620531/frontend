import { TestBed } from '@angular/core/testing';

import { PlantillaComprobanteService } from './plantilla-comprobante.service';

describe('PlantillaComprobanteService', () => {
  let service: PlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
