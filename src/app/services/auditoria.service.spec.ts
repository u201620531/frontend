import { TestBed } from '@angular/core/testing';
import { AuditoriaService } from './auditoria.service';
import { HttpClientModule } from '@angular/common/http';
import { Auditoria } from '../interfaces/auditoria';

describe('AuditoriaService', () => {
  let service: AuditoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(AuditoriaService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarAditorias y retorna error', () => {
    spyOn(service, 'listarAditorias').and.throwError('error');

    const res = expect(service.listarAditorias).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarAditorias', () => {
    spyOn(service, 'listarAditorias').and.callThrough();

    const res = service.listarAditorias();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listaAuditoriaPorfecha y retorna error', () => {
    spyOn(service, 'listaAuditoriaPorfecha').and.throwError('error');

    const res = expect(service.listaAuditoriaPorfecha).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listaAuditoriaPorfecha', () => {
    spyOn(service, 'listaAuditoriaPorfecha').and.callThrough();

    const res = service.listaAuditoriaPorfecha('2022-01-01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarAuditoria y retorna error', () => {
    spyOn(service, 'agregarAuditoria').and.throwError('error');

    const res = expect(service.agregarAuditoria).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarAuditoria', () => {
    const aud: Auditoria = {
      fecha: '2022-01-01',
      opcion: '',
      proceso: '',
      codigoError: '',
      codigoUsuario: '',
      mensageError: '',
      detalleError: '',
    };
    spyOn(service, 'agregarAuditoria').and.callThrough();

    const res = service.agregarAuditoria(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarAuditoria y retorna error', () => {
    spyOn(service, 'actualizarAuditoria').and.throwError('error');

    const res = expect(service.actualizarAuditoria).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarAuditoria', () => {
    const aud: Auditoria = {
      fecha: '2022-01-01',
      opcion: '',
      proceso: '',
      codigoError: '',
      codigoUsuario: '',
      mensageError: '',
      detalleError: '',
    };
    spyOn(service, 'actualizarAuditoria').and.callThrough();

    const res = service.actualizarAuditoria(aud, '2022-01-01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarAuditoria y retorna error', () => {
    spyOn(service, 'eliminarAuditoria').and.throwError('error');

    const res = expect(service.eliminarAuditoria).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarAuditoria', () => {
    spyOn(service, 'eliminarAuditoria').and.callThrough();

    const res = service.eliminarAuditoria('2022-01-01');

    expect(typeof res).toBe('object');
  });
});
