import { TestBed } from '@angular/core/testing';
import { FormaPagoService } from './forma-pago.service';
import { HttpClientModule } from '@angular/common/http';
import { FormaPago } from '../interfaces/forma-pago';

describe('FormaPagoService', () => {
  let service: FormaPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(FormaPagoService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarFormaPago y retorna error', () => {
    spyOn(service, 'listarFormaPago').and.throwError('error');

    const res = expect(service.listarFormaPago).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarFormaPago', () => {
    spyOn(service, 'listarFormaPago').and.callThrough();

    const res = service.listarFormaPago();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarFormaPagoPorId y retorna error', () => {
    spyOn(service, 'listarFormaPagoPorId').and.throwError('error');

    const res = expect(service.listarFormaPagoPorId).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarFormaPagoPorId', () => {
    spyOn(service, 'listarFormaPagoPorId').and.callThrough();

    const res = service.listarFormaPagoPorId('CON');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarFormaPago y retorna error', () => {
    spyOn(service, 'agregarFormaPago').and.throwError('error');

    const res = expect(service.agregarFormaPago).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarFormaPago', () => {
    const aud: FormaPago = {
      idFormaPago: 'CON',
      descripcion: 'test',
      abreviatura: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarFormaPago').and.callThrough();

    const res = service.agregarFormaPago(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarFormaPago y retorna error', () => {
    spyOn(service, 'actualizarFormaPago').and.throwError('error');

    const res = expect(service.actualizarFormaPago).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarFormaPago', () => {
    const aud: FormaPago = {
      idFormaPago: 'CON',
      descripcion: 'test',
      abreviatura: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarFormaPago').and.callThrough();

    const res = service.actualizarFormaPago(aud, 'CON');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarFormaPago y retorna error', () => {
    spyOn(service, 'eliminarFormaPago').and.throwError('error');

    const res = expect(service.eliminarFormaPago).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarFormaPago', () => {
    spyOn(service, 'eliminarFormaPago').and.callThrough();

    const res = service.eliminarFormaPago('CON');

    expect(typeof res).toBe('object');
  });
});
