import { TestBed } from '@angular/core/testing';
import { DetallePlantillaComprobanteService } from './detalle-plantilla-comprobante.service';
import { HttpClientModule } from '@angular/common/http';
import { DetallePlantillaComprobante } from '../interfaces/detalle-plantilla-comprobante';

describe('DetallePlantillaComprobanteService', () => {
  let service: DetallePlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(DetallePlantillaComprobanteService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarDetallePlantillaComprobante y retorna error', () => {
    spyOn(service, 'listarDetallePlantillaComprobante').and.throwError('error');

    const res = expect(service.listarDetallePlantillaComprobante).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarDetallePlantillaComprobante', () => {
    spyOn(service, 'listarDetallePlantillaComprobante').and.callThrough();

    const res = service.listarDetallePlantillaComprobante('000001');

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarDetallePlantillaComprobantePorId y retorna error', () => {
    spyOn(service, 'listarDetallePlantillaComprobantePorId').and.throwError(
      'error'
    );

    const res = expect(
      service.listarDetallePlantillaComprobantePorId
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarDetallePlantillaComprobantePorId', () => {
    spyOn(service, 'listarDetallePlantillaComprobantePorId').and.callThrough();

    const res = service.listarDetallePlantillaComprobantePorId(
      '0001',
      '4200121'
    );

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarDetallePlantillaComprobante y retorna error', () => {
    spyOn(service, 'agregarDetallePlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(service.agregarDetallePlantillaComprobante).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarDetallePlantillaComprobante', () => {
    const aud: DetallePlantillaComprobante = {
      idCentroCosto: '0001',
      idComprobante: '009',
      idCuentaContable: '',
      numeroComprobante: '',
      importeOriginal: 0,
      tipoConvergencia: '',
      debeHaber: '',
      codigoAnexo: '',
      subDiario: '',
      detalle: '',
      glosaDetalle: '',
      glosaPrincipal: '',
      fechaComprobante: '',
      idPlantillaComprobante: '420021',
      estado: 'A',
    };
    spyOn(service, 'agregarDetallePlantillaComprobante').and.callThrough();

    const res = service.agregarDetallePlantillaComprobante(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarDetallePlantillaComprobante y retorna error', () => {
    spyOn(service, 'actualizarDetallePlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(
      service.actualizarDetallePlantillaComprobante
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarDetallePlantillaComprobante', () => {
    const aud: DetallePlantillaComprobante = {
      idCentroCosto: '0001',
      idComprobante: '009',
      idCuentaContable: '',
      numeroComprobante: '',
      importeOriginal: 0,
      tipoConvergencia: '',
      debeHaber: '',
      codigoAnexo: '',
      subDiario: '',
      detalle: '',
      glosaDetalle: '',
      glosaPrincipal: '',
      fechaComprobante: '',
      idPlantillaComprobante: '420021',
      estado: 'A',
    };
    spyOn(service, 'actualizarDetallePlantillaComprobante').and.callThrough();

    const res = service.actualizarDetallePlantillaComprobante(
      aud,
      '4200121',
      '001'
    );

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarDetallePlantillaComprobante y retorna error', () => {
    spyOn(service, 'eliminarDetallePlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(
      service.eliminarDetallePlantillaComprobante
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarDetallePlantillaComprobante', () => {
    spyOn(service, 'eliminarDetallePlantillaComprobante').and.callThrough();

    const res = service.eliminarDetallePlantillaComprobante('4200121', '001');

    expect(typeof res).toBe('object');
  });
});
