import { TestBed } from '@angular/core/testing';
import { MonedaService } from './moneda.service';
import { HttpClientModule } from '@angular/common/http';
import { Moneda } from '../interfaces/moneda';

describe('MonedaService', () => {
  let service: MonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(MonedaService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarMonedas y retorna error', () => {
    spyOn(service, 'listarMonedas').and.throwError('error');

    const res = expect(service.listarMonedas).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarMonedas', () => {
    spyOn(service, 'listarMonedas').and.callThrough();

    const res = service.listarMonedas();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listaMonedaPorIdMoneda y retorna error', () => {
    spyOn(service, 'listaMonedaPorIdMoneda').and.throwError('error');

    const res = expect(service.listaMonedaPorIdMoneda).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listaMonedaPorIdMoneda', () => {
    spyOn(service, 'listaMonedaPorIdMoneda').and.callThrough();

    const res = service.listaMonedaPorIdMoneda('MN');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarMoneda y retorna error', () => {
    spyOn(service, 'agregarMoneda').and.throwError('error');

    const res = expect(service.agregarMoneda).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarMoneda', () => {
    const aud: Moneda = {
      idMoneda: 'MN',
      descripcion: 'test',
      abreviatura: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarMoneda').and.callThrough();

    const res = service.agregarMoneda(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarMoneda y retorna error', () => {
    spyOn(service, 'actualizarMoneda').and.throwError('error');

    const res = expect(service.actualizarMoneda).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarMoneda', () => {
    const aud: Moneda = {
      idMoneda: 'MN',
      descripcion: 'test',
      abreviatura: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarMoneda').and.callThrough();

    const res = service.actualizarMoneda(aud, 'MN');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarMoneda y retorna error', () => {
    spyOn(service, 'eliminarMoneda').and.throwError('error');

    const res = expect(service.eliminarMoneda).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarMoneda', () => {
    spyOn(service, 'eliminarMoneda').and.callThrough();

    const res = service.eliminarMoneda('MN');

    expect(typeof res).toBe('object');
  });
});
