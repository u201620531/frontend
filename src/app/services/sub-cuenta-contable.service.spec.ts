import { TestBed } from '@angular/core/testing';

import { SubCuentaContableService } from './sub-cuenta-contable.service';
import { HttpClientModule } from '@angular/common/http';

describe('SubCuentaContableService', () => {
  let service: SubCuentaContableService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(SubCuentaContableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
