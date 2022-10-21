import { TestBed } from '@angular/core/testing';
import { TipoCambioService } from './tipo-cambio.service';
import { HttpClientModule } from '@angular/common/http';
import { TipoCambio } from '../interfaces/tipo-cambio';

describe('TipoCambioService', () => {
  let service: TipoCambioService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(TipoCambioService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarTiposCambio y retorna error', () => {
    spyOn(service, 'listarTiposCambio').and.throwError('error');

    const res = expect(service.listarTiposCambio).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarTiposCambio', () => {
    spyOn(service, 'listarTiposCambio').and.callThrough();

    const res = service.listarTiposCambio();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listaTipoCambioPorfecha y retorna error', () => {
    spyOn(service, 'listaTipoCambioPorfecha').and.throwError('error');

    const res = expect(service.listaTipoCambioPorfecha).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listaTipoCambioPorfecha', () => {
    spyOn(service, 'listaTipoCambioPorfecha').and.callThrough();

    const res = service.listaTipoCambioPorfecha('2022-01-01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarTipoCambio y retorna error', () => {
    spyOn(service, 'agregarTipoCambio').and.throwError('error');

    const res = expect(service.agregarTipoCambio).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarTipoCambio', () => {
    const aud: TipoCambio = {
      fecha: '2022-01-01',
      compra: 3.99,
      venta: 4.0,
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarTipoCambio').and.callThrough();

    const res = service.agregarTipoCambio(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarTipoCambio y retorna error', () => {
    spyOn(service, 'actualizarTipoCambio').and.throwError('error');

    const res = expect(service.actualizarTipoCambio).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarTipoCambio', () => {
    const aud: TipoCambio = {
      fecha: '2022-01-01',
      compra: 3.99,
      venta: 4.0,
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarTipoCambio').and.callThrough();

    const res = service.actualizarTipoCambio(aud, '2022-01-01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarTipoCambio y retorna error', () => {
    spyOn(service, 'eliminarTipoCambio').and.throwError('error');

    const res = expect(service.eliminarTipoCambio).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarTipoCambio', () => {
    spyOn(service, 'eliminarTipoCambio').and.callThrough();

    const res = service.eliminarTipoCambio('2022-01-01');

    expect(typeof res).toBe('object');
  });
});
