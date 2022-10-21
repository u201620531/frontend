import { TestBed } from '@angular/core/testing';
import { ProveedorService } from './proveedor.service';
import { HttpClientModule } from '@angular/common/http';
import { Proveedor } from '../interfaces/proveedor';

describe('ProveedorService', () => {
  let service: ProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ProveedorService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarPoveedores y retorna error', () => {
    spyOn(service, 'listarPoveedores').and.throwError('error');

    const res = expect(service.listarPoveedores).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarPoveedores', () => {
    spyOn(service, 'listarPoveedores').and.callThrough();

    const res = service.listarPoveedores();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarProveedorPoridProveedor y retorna error', () => {
    spyOn(service, 'listarProveedorPoridProveedor').and.throwError('error');

    const res = expect(service.listarProveedorPoridProveedor).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarProveedorPoridProveedor', () => {
    spyOn(service, 'listarProveedorPoridProveedor').and.callThrough();

    const res = service.listarProveedorPoridProveedor('TPV');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarProveedor y retorna error', () => {
    spyOn(service, 'agregarProveedor').and.throwError('error');

    const res = expect(service.agregarProveedor).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarProveedor', () => {
    const aud: Proveedor = {
      idProveedor: 'TPV',
      razonSocial: 'TTT',
      nombreComercial: 'Tipo P',
      email1: '',
      email2: '',
      idTipoDocumento: '',
      idTipoProveedor: 'J',
      nroDocumento: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarProveedor').and.callThrough();

    const res = service.agregarProveedor(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarProveedor y retorna error', () => {
    spyOn(service, 'actualizarProveedor').and.throwError('error');

    const res = expect(service.actualizarProveedor).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarProveedor', () => {
    const aud: Proveedor = {
      idProveedor: 'TPV',
      razonSocial: 'TTT',
      nombreComercial: 'Tipo P',
      email1: '',
      email2: '',
      idTipoDocumento: '',
      idTipoProveedor: 'J',
      nroDocumento: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarProveedor').and.callThrough();

    const res = service.actualizarProveedor(aud, '001');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarProveedor y retorna error', () => {
    spyOn(service, 'eliminarProveedor').and.throwError('error');

    const res = expect(service.eliminarProveedor).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarProveedor', () => {
    spyOn(service, 'eliminarProveedor').and.callThrough();

    const res = service.eliminarProveedor('TPV');

    expect(typeof res).toBe('object');
  });
});
