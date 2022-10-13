import { TestBed } from '@angular/core/testing';

import { CuentaContableService } from './cuenta-contable.service';
import { HttpClientModule } from '@angular/common/http';

describe('CuentaContableService', () => {
  let service: CuentaContableService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(CuentaContableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
