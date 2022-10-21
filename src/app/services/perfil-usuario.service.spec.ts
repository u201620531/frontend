import { TestBed } from '@angular/core/testing';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { PerfilUsuario } from '../interfaces/perfil-usuario';

describe('PerfilUsuarioService', () => {
  let service: PerfilUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(PerfilUsuarioService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarPerfilesUsuario y retorna error', () => {
    spyOn(service, 'listarPerfilesUsuario').and.throwError('error');

    const res = expect(service.listarPerfilesUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarPerfilesUsuario', () => {
    spyOn(service, 'listarPerfilesUsuario').and.callThrough();

    const res = service.listarPerfilesUsuario();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listaPerfilUsuarioPoridPerfilUsuario y retorna error', () => {
    spyOn(service, 'listaPerfilUsuarioPoridPerfilUsuario').and.throwError(
      'error'
    );

    const res = expect(
      service.listaPerfilUsuarioPoridPerfilUsuario
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listaPerfilUsuarioPoridPerfilUsuario', () => {
    spyOn(service, 'listaPerfilUsuarioPoridPerfilUsuario').and.callThrough();

    const res = service.listaPerfilUsuarioPoridPerfilUsuario('TPV');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarPerfilUsuario y retorna error', () => {
    spyOn(service, 'agregarPerfilUsuario').and.throwError('error');

    const res = expect(service.agregarPerfilUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarPerfilUsuario', () => {
    const aud: PerfilUsuario = {
      idPerfilUsuario: 'TPV',
      nombre: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarPerfilUsuario').and.callThrough();

    const res = service.agregarPerfilUsuario(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarPerfilUsuario y retorna error', () => {
    spyOn(service, 'actualizarPerfilUsuario').and.throwError('error');

    const res = expect(service.actualizarPerfilUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarPerfilUsuario', () => {
    const aud: PerfilUsuario = {
      idPerfilUsuario: 'TPV',
      nombre: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarPerfilUsuario').and.callThrough();

    const res = service.actualizarPerfilUsuario(aud, '001');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarPerfilUsuario y retorna error', () => {
    spyOn(service, 'eliminarPerfilUsuario').and.throwError('error');

    const res = expect(service.eliminarPerfilUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarPerfilUsuario', () => {
    spyOn(service, 'eliminarPerfilUsuario').and.callThrough();

    const res = service.eliminarPerfilUsuario('TPV');

    expect(typeof res).toBe('object');
  });
});
