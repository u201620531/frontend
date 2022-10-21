import { TestBed } from '@angular/core/testing';
import { TipoDocumentoService } from './tipo-documento.service';
import { HttpClientModule } from '@angular/common/http';
import { TipoDocumento } from '../interfaces/tipo-documento';

describe('TipoDocumentoService', () => {
  let service: TipoDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(TipoDocumentoService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarTipoDocumento y retorna error', () => {
    spyOn(service, 'listarTipoDocumento').and.throwError('error');

    const res = expect(service.listarTipoDocumento).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarTipoDocumento', () => {
    spyOn(service, 'listarTipoDocumento').and.callThrough();

    const res = service.listarTipoDocumento();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarTipoDocumentoPorId y retorna error', () => {
    spyOn(service, 'listarTipoDocumentoPorId').and.throwError('error');

    const res = expect(service.listarTipoDocumentoPorId).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarTipoDocumentoPorId', () => {
    spyOn(service, 'listarTipoDocumentoPorId').and.callThrough();

    const res = service.listarTipoDocumentoPorId('MN');

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarTipoDocumentoPorDescripcion y retorna error', () => {
    spyOn(service, 'listarTipoDocumentoPorDescripcion').and.throwError('error');

    const res = expect(service.listarTipoDocumentoPorDescripcion).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarTipoDocumentoPorDescripcion', () => {
    spyOn(service, 'listarTipoDocumentoPorDescripcion').and.callThrough();

    const res = service.listarTipoDocumentoPorDescripcion('01', 'A');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarTipoDocumento y retorna error', () => {
    spyOn(service, 'agregarTipoDocumento').and.throwError('error');

    const res = expect(service.agregarTipoDocumento).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarTipoDocumento', () => {
    const aud: TipoDocumento = {
      idTipoDocumento: 'MN',
      descripcion: 'test',
      abreviatura: '',
      asientos: 3,
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarTipoDocumento').and.callThrough();

    const res = service.agregarTipoDocumento(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarTipoDocumento y retorna error', () => {
    spyOn(service, 'actualizarTipoDocumento').and.throwError('error');

    const res = expect(service.actualizarTipoDocumento).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarTipoDocumento', () => {
    const aud: TipoDocumento = {
      idTipoDocumento: 'MN',
      descripcion: 'test',
      abreviatura: '',
      asientos: 3,
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarTipoDocumento').and.callThrough();

    const res = service.actualizarTipoDocumento(aud, 'MN');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarTipoDocumento y retorna error', () => {
    spyOn(service, 'eliminarTipoDocumento').and.throwError('error');

    const res = expect(service.eliminarTipoDocumento).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarTipoDocumento', () => {
    spyOn(service, 'eliminarTipoDocumento').and.callThrough();

    const res = service.eliminarTipoDocumento('MN');

    expect(typeof res).toBe('object');
  });
});
