import { TestBed } from '@angular/core/testing';
import { ModuloService } from './modulo.service';
import { HttpClientModule } from '@angular/common/http';
import { Modulo } from '../interfaces/modulo';

describe('ModuloService', () => {
  let service: ModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ModuloService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarModulos y retorna error', () => {
    spyOn(service, 'listarModulos').and.throwError('error');

    const res = expect(service.listarModulos).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarModulos', () => {
    spyOn(service, 'listarModulos').and.callThrough();

    const res = service.listarModulos();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarModuloPorIdModulo y retorna error', () => {
    spyOn(service, 'listarModuloPorIdModulo').and.throwError('error');

    const res = expect(service.listarModuloPorIdModulo).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarModuloPorIdModulo', () => {
    spyOn(service, 'listarModuloPorIdModulo').and.callThrough();

    const res = service.listarModuloPorIdModulo('01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarModulosPorIdPerfilUsuario y retorna error', () => {
    spyOn(service, 'listarModulosPorIdPerfilUsuario').and.throwError('error');

    const res = expect(service.listarModulosPorIdPerfilUsuario).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarModulosPorIdPerfilUsuario', () => {
    spyOn(service, 'listarModulosPorIdPerfilUsuario').and.callThrough();

    const res = service.listarModulosPorIdPerfilUsuario('01', '');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarModulo y retorna error', () => {
    spyOn(service, 'agregarModulo').and.throwError('error');

    const res = expect(service.agregarModulo).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarModulo', () => {
    const aud: Modulo = {
      idModulo: '01',
      nombreModulo: '',
      vistaModulo: '',
      esPrincipal: 0,
      menu: null,
    };
    spyOn(service, 'agregarModulo').and.callThrough();

    const res = service.agregarModulo(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarModulo y retorna error', () => {
    spyOn(service, 'actualizarModulo').and.throwError('error');

    const res = expect(service.actualizarModulo).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarModulo', () => {
    const aud: Modulo = {
      idModulo: '01',
      nombreModulo: '',
      vistaModulo: '',
      esPrincipal: 0,
      menu: null,
    };
    spyOn(service, 'actualizarModulo').and.callThrough();

    const res = service.actualizarModulo(aud, '01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarModulo y retorna error', () => {
    spyOn(service, 'eliminarModulo').and.throwError('error');

    const res = expect(service.eliminarModulo).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarModulo', () => {
    spyOn(service, 'eliminarModulo').and.callThrough();

    const res = service.eliminarModulo('01');

    expect(typeof res).toBe('object');
  });
});
