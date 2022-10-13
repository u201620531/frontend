import { TestBed } from '@angular/core/testing';

import { FormaPagoService } from './forma-pago.service';
import { HttpClientModule } from '@angular/common/http';

describe('FormaPagoService', () => {
  let service: FormaPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(FormaPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
