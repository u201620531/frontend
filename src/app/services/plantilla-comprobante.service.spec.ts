import { TestBed } from '@angular/core/testing';

import { PlantillaComprobanteService } from './plantilla-comprobante.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlantillaComprobanteService', () => {
  let service: PlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(PlantillaComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
