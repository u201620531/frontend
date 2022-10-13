import { TestBed } from '@angular/core/testing';

import { PerfilUsuarioService } from './perfil-usuario.service';
import { HttpClientModule } from '@angular/common/http';

describe('PerfilUsuarioService', () => {
  let service: PerfilUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(PerfilUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
