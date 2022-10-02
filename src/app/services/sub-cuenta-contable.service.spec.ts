import { TestBed } from '@angular/core/testing';

import { SubCuentaContableService } from './sub-cuenta-contable.service';

describe('SubCuentaContableService', () => {
  let service: SubCuentaContableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCuentaContableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
