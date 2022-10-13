import { TestBed } from '@angular/core/testing';

import { ModuloService } from './modulo.service';
import { HttpClientModule } from '@angular/common/http';

describe('ModuloService', () => {
  let service: ModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
