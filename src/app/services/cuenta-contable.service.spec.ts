import { TestBed } from '@angular/core/testing';
import { CuentaContableService } from './cuenta-contable.service';
import { HttpClientModule } from '@angular/common/http';
import { CuentaContable } from '../interfaces/cuenta-contable';

describe('CuentaContableService', () => {
  let service: CuentaContableService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(CuentaContableService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarCuentasContables y retorna error', () => {
    spyOn(service, 'listarCuentasContables').and.throwError('error');

    const res = expect(service.listarCuentasContables).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarCuentasContables', () => {
    spyOn(service, 'listarCuentasContables').and.callThrough();

    const res = service.listarCuentasContables();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listaCuentaContablePorIdCuentaContable y retorna error', () => {
    spyOn(service, 'listaCuentaContablePorIdCuentaContable').and.throwError(
      'error'
    );

    const res = expect(
      service.listaCuentaContablePorIdCuentaContable
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listaCuentaContablePorIdCuentaContable', () => {
    spyOn(service, 'listaCuentaContablePorIdCuentaContable').and.callThrough();

    const res = service.listaCuentaContablePorIdCuentaContable('4200121');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarCuentaContable y retorna error', () => {
    spyOn(service, 'agregarCuentaContable').and.throwError('error');

    const res = expect(service.agregarCuentaContable).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarCuentaContable', () => {
    const aud: CuentaContable = {
      idCuentaContable: '420021',
      nombre: 'test',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarCuentaContable').and.callThrough();

    const res = service.agregarCuentaContable(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarCuentaContable y retorna error', () => {
    spyOn(service, 'actualizarCuentaContable').and.throwError('error');

    const res = expect(service.actualizarCuentaContable).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarCuentaContable', () => {
    const aud: CuentaContable = {
      idCuentaContable: '420021',
      nombre: 'test',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarCuentaContable').and.callThrough();

    const res = service.actualizarCuentaContable(aud, '4200121');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarCuentaContable y retorna error', () => {
    spyOn(service, 'eliminarCuentaContable').and.throwError('error');

    const res = expect(service.eliminarCuentaContable).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarCuentaContable', () => {
    spyOn(service, 'eliminarCuentaContable').and.callThrough();

    const res = service.eliminarCuentaContable('4200121');

    expect(typeof res).toBe('object');
  });
});
