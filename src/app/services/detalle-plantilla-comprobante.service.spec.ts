import { TestBed } from '@angular/core/testing';

import { DetallePlantillaComprobanteService } from './detalle-plantilla-comprobante.service';
import { HttpClientModule } from '@angular/common/http';

describe('DetallePlantillaComprobanteService', () => {
  let service: DetallePlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(DetallePlantillaComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
