import { TestBed } from '@angular/core/testing';

import { TipoDocumentoService } from './tipo-documento.service';
import { HttpClientModule } from '@angular/common/http';

describe('TipoDocumentoService', () => {
  let service: TipoDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(TipoDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
