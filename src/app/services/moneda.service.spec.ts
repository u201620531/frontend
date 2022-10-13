import { TestBed } from '@angular/core/testing';

import { MonedaService } from './moneda.service';
import { HttpClientModule } from '@angular/common/http';

describe('MonedaService', () => {
  let service: MonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(MonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
