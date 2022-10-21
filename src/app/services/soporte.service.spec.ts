import { TestBed } from '@angular/core/testing';
import { SoporteService } from './soporte.service';
import { HttpClientModule } from '@angular/common/http';
import { Soporte } from '../interfaces/soporte';

describe('SoporteService', () => {
  let service: SoporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(SoporteService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarSoportes y retorna error', () => {
    spyOn(service, 'listarSoportes').and.throwError('error');

    const res = expect(service.listarSoportes).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarSoportes', () => {
    spyOn(service, 'listarSoportes').and.callThrough();

    const res = service.listarSoportes();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarSoporteById y retorna error', () => {
    spyOn(service, 'listarSoporteById').and.throwError('error');

    const res = expect(service.listarSoporteById).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarSoporteById', () => {
    spyOn(service, 'listarSoporteById').and.callThrough();

    const res = service.listarSoporteById('TPV');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarSoporte y retorna error', () => {
    spyOn(service, 'agregarSoporte').and.throwError('error');

    const res = expect(service.agregarSoporte).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarSoporte', () => {
    const aud: Soporte = {
      idSoporte: 'TPV',
      nombre: 'Tipo P',
      valor: 'J',
      descripcion: 'Jurid',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarSoporte').and.callThrough();

    const res = service.agregarSoporte(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarSoporte y retorna error', () => {
    spyOn(service, 'actualizarSoporte').and.throwError('error');

    const res = expect(service.actualizarSoporte).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarSoporte', () => {
    const aud: Soporte = {
      idSoporte: 'TPV',
      nombre: 'Tipo P',
      valor: 'J',
      descripcion: 'Jurid',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarSoporte').and.callThrough();

    const res = service.actualizarSoporte(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarSoporte y retorna error', () => {
    spyOn(service, 'eliminarSoporte').and.throwError('error');

    const res = expect(service.eliminarSoporte).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarSoporte', () => {
    spyOn(service, 'eliminarSoporte').and.callThrough();

    const res = service.eliminarSoporte('TPV');

    expect(typeof res).toBe('undefined');
  });
});
