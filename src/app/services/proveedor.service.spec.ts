import { TestBed } from '@angular/core/testing';

import { ProveedorService } from './proveedor.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProveedorService', () => {
  let service: ProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
