import { TestBed } from '@angular/core/testing';

import { AuditoriaService } from './auditoria.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuditoriaService', () => {
  let service: AuditoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(AuditoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
