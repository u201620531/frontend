import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(UsuarioService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarUsuarios y retorna error', () => {
    spyOn(service, 'listarUsuarios').and.throwError('error');

    const res = expect(service.listarUsuarios).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarUsuarios', () => {
    spyOn(service, 'listarUsuarios').and.callThrough();

    const res = service.listarUsuarios();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarUsuarioPorCodigoUsuario y retorna error', () => {
    spyOn(service, 'listarUsuarioPorCodigoUsuario').and.throwError('error');

    const res = expect(service.listarUsuarioPorCodigoUsuario).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarUsuarioPorCodigoUsuario', () => {
    spyOn(service, 'listarUsuarioPorCodigoUsuario').and.callThrough();

    const res = service.listarUsuarioPorCodigoUsuario('TPV');

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarUsuarioPorCodigoUsuarioyContrasena y retorna error', () => {
    spyOn(service, 'listarUsuarioPorCodigoUsuarioyContrasena').and.throwError(
      'error'
    );

    const res = expect(
      service.listarUsuarioPorCodigoUsuarioyContrasena
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarUsuarioPorCodigoUsuarioyContrasena', () => {
    spyOn(
      service,
      'listarUsuarioPorCodigoUsuarioyContrasena'
    ).and.callThrough();

    const res = service.listarUsuarioPorCodigoUsuarioyContrasena('test', '***');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarUsuario y retorna error', () => {
    spyOn(service, 'agregarUsuario').and.throwError('error');

    const res = expect(service.agregarUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarUsuario', () => {
    const aud: Usuario = {
      idEmpleado: '',
      codigoUsuario: 'test',
      contrasena: '***',
      idPerfilUsuario: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarUsuario').and.callThrough();

    const res = service.agregarUsuario(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarUsuario y retorna error', () => {
    spyOn(service, 'actualizarUsuario').and.throwError('error');

    const res = expect(service.actualizarUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarUsuario', () => {
    const aud: Usuario = {
      idEmpleado: '',
      codigoUsuario: 'test',
      contrasena: '***',
      idPerfilUsuario: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarUsuario').and.callThrough();

    const res = service.actualizarUsuario(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarUsuario y retorna error', () => {
    spyOn(service, 'eliminarUsuario').and.throwError('error');

    const res = expect(service.eliminarUsuario).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarUsuario', () => {
    spyOn(service, 'eliminarUsuario').and.callThrough();

    const res = service.eliminarUsuario('TPV', 'test');

    expect(typeof res).toBe('object');
  });
});
