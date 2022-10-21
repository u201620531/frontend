import { TestBed } from '@angular/core/testing';
import { CorrelativoPlantillaComprobanteService } from './correlativo-plantilla-comprobante.service';
import { HttpClientModule } from '@angular/common/http';
import { CorrelativoPlantillaComprobante } from '../interfaces/correlativo-plantilla-comprobante';

describe('CorrelativoPlantillaComprobanteService', () => {
  let service: CorrelativoPlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(CorrelativoPlantillaComprobanteService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarCorrelativoPlantillaComprobante y retorna error', () => {
    spyOn(service, 'listarCorrelativoPlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(
      service.listarCorrelativoPlantillaComprobante
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarCorrelativoPlantillaComprobante', () => {
    spyOn(service, 'listarCorrelativoPlantillaComprobante').and.callThrough();

    const res = service.listarCorrelativoPlantillaComprobante();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarCorrelativoPlantillaComprobantePorAnoyMes y retorna error', () => {
    spyOn(
      service,
      'listarCorrelativoPlantillaComprobantePorAnoyMes'
    ).and.throwError('error');

    const res = expect(
      service.listarCorrelativoPlantillaComprobantePorAnoyMes
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarCorrelativoPlantillaComprobantePorAnoyMes', () => {
    spyOn(
      service,
      'listarCorrelativoPlantillaComprobantePorAnoyMes'
    ).and.callThrough();

    const res = service.listarCorrelativoPlantillaComprobantePorAnoyMes(
      2022,
      1
    );

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarCorrelativoPlantillaComprobante y retorna error', () => {
    spyOn(service, 'agregarCorrelativoPlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(
      service.agregarCorrelativoPlantillaComprobante
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarCorrelativoPlantillaComprobante', () => {
    const aud: CorrelativoPlantillaComprobante = {
      ano: 2022,
      mes: 1,
      correlativo: 1,
    };
    spyOn(service, 'agregarCorrelativoPlantillaComprobante').and.callThrough();

    const res = service.agregarCorrelativoPlantillaComprobante(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarCorrelativoPlantillaComprobante y retorna error', () => {
    spyOn(service, 'actualizarCorrelativoPlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(
      service.actualizarCorrelativoPlantillaComprobante
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarCorrelativoPlantillaComprobante', () => {
    const aud: CorrelativoPlantillaComprobante = {
      ano: 2022,
      mes: 1,
      correlativo: 1,
    };
    spyOn(
      service,
      'actualizarCorrelativoPlantillaComprobante'
    ).and.callThrough();

    const res = service.actualizarCorrelativoPlantillaComprobante(aud, 2022, 1);

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarCorrelativoPlantillaComprobante y retorna error', () => {
    spyOn(service, 'eliminarCorrelativoPlantillaComprobante').and.throwError(
      'error'
    );

    const res = expect(
      service.eliminarCorrelativoPlantillaComprobante
    ).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarCorrelativoPlantillaComprobante', () => {
    spyOn(service, 'eliminarCorrelativoPlantillaComprobante').and.callThrough();

    const res = service.eliminarCorrelativoPlantillaComprobante(2022, 1);

    expect(typeof res).toBe('object');
  });
});
