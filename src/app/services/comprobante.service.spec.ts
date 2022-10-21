import { TestBed } from '@angular/core/testing';
import { ComprobanteService } from './comprobante.service';
import { HttpClientModule } from '@angular/common/http';
import { Comprobante } from '../interfaces/comprobante';

describe('ComprobanteService', () => {
  let service: ComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(ComprobanteService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarAditorias y retorna error', () => {
    spyOn(service, 'listarComprobante').and.throwError('error');

    const res = expect(service.listarComprobante).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarAditorias', () => {
    spyOn(service, 'listarComprobante').and.callThrough();

    const res = service.listarComprobante();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarComprobantePorId y retorna error', () => {
    spyOn(service, 'listarComprobantePorId').and.throwError('error');

    const res = expect(service.listarComprobantePorId).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarComprobantePorId', () => {
    spyOn(service, 'listarComprobantePorId').and.callThrough();

    const res = service.listarComprobantePorId('2022-01-01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método reporteComprobante', () => {
    spyOn(service, 'reporteComprobante').and.callThrough();

    const res = service.reporteComprobante('', '', '', '', '', '', '');

    expect(typeof res).toBe('object');
  });

  it('Llama al método reporteComprobante y retorna error', () => {
    spyOn(service, 'reporteComprobante').and.throwError('error');

    const res = expect(service.reporteComprobante).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarComprobante y retorna error', () => {
    spyOn(service, 'agregarComprobante').and.throwError('error');

    const res = expect(service.agregarComprobante).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarComprobante', () => {
    const aud: Comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '',
      fechaEmision: '',
      fechaVencimiento: '',
      totalGravadas: 0,
      totalInafectas: 0,
      totalExoneradas: 0,
      totalExportacion: 0,
      valorCompra: 0,
      igv: 0,
      isc: 0,
      otrosTributos: 0,
      otrosCargos: 0,
      descuentosGlobales: 0,
      importeTotal: 0,
      tipoCambio: 0,
      idMoneda: '',
      serieGuia: '',
      correlativoGuia: '',
      estado: '',
      fechaCreacion: '',
      usuarioCreacion: '',
    };
    spyOn(service, 'agregarComprobante').and.callThrough();

    const res = service.agregarComprobante(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarComprobante y retorna error', () => {
    spyOn(service, 'actualizarComprobante').and.throwError('error');

    const res = expect(service.actualizarComprobante).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarComprobante', () => {
    const aud: Comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '',
      fechaEmision: '',
      fechaVencimiento: '',
      totalGravadas: 0,
      totalInafectas: 0,
      totalExoneradas: 0,
      totalExportacion: 0,
      valorCompra: 0,
      igv: 0,
      isc: 0,
      otrosTributos: 0,
      otrosCargos: 0,
      descuentosGlobales: 0,
      importeTotal: 0,
      tipoCambio: 0,
      idMoneda: '',
      serieGuia: '',
      correlativoGuia: '',
      estado: '',
      fechaCreacion: '',
      usuarioCreacion: '',
    };
    spyOn(service, 'actualizarComprobante').and.callThrough();

    const res = service.actualizarComprobante(aud, '2022-01-01');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarComprobante y retorna error', () => {
    spyOn(service, 'eliminarComprobante').and.throwError('error');

    const res = expect(service.eliminarComprobante).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarComprobante', () => {
    spyOn(service, 'eliminarComprobante').and.callThrough();

    const res = service.eliminarComprobante('2022-01-01');

    expect(typeof res).toBe('object');
  });
});
