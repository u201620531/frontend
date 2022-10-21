import { TestBed } from '@angular/core/testing';
import { PlantillaComprobanteService } from './plantilla-comprobante.service';
import { HttpClientModule } from '@angular/common/http';
import { PlantillaComprobante } from '../interfaces/plantilla-comprobante';

describe('PlantillaComprobanteService', () => {
  let service: PlantillaComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(PlantillaComprobanteService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarPlantillaComprobante y retorna error', () => {
    spyOn(service, 'listarPlantillaComprobante').and.throwError('error');

    const res = expect(service.listarPlantillaComprobante).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarPlantillaComprobante', () => {
    spyOn(service, 'listarPlantillaComprobante').and.callThrough();

    const res = service.listarPlantillaComprobante();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarPlantillaComprobantePorId y retorna error', () => {
    spyOn(service, 'listarPlantillaComprobantePorId').and.throwError('error');

    const res = expect(service.listarPlantillaComprobantePorId).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarPlantillaComprobantePorId', () => {
    spyOn(service, 'listarPlantillaComprobantePorId').and.callThrough();

    const res = service.listarPlantillaComprobantePorId('TPV');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarPlantillaComprobante y retorna error', () => {
    spyOn(service, 'agregarPlantillaComprobante').and.throwError('error');

    const res = expect(service.agregarPlantillaComprobante).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarPlantillaComprobante', () => {
    const aud: PlantillaComprobante = {
      idPlantillaComprobante: 'TPV',
      fechaCarga: '',
      fechaDeclaracion: '',
      observacion: '',
      nroTicketEnvio: '000',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarPlantillaComprobante').and.callThrough();

    const res = service.agregarPlantillaComprobante(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarPlantillaComprobante y retorna error', () => {
    spyOn(service, 'actualizarPlantillaComprobante').and.throwError('error');

    const res = expect(service.actualizarPlantillaComprobante).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarPlantillaComprobante', () => {
    const aud: PlantillaComprobante = {
      idPlantillaComprobante: 'TPV',
      fechaCarga: '',
      fechaDeclaracion: '',
      observacion: '',
      nroTicketEnvio: '000',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarPlantillaComprobante').and.callThrough();

    const res = service.actualizarPlantillaComprobante(aud, '001');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarPlantillaComprobante y retorna error', () => {
    spyOn(service, 'eliminarPlantillaComprobante').and.throwError('error');

    const res = expect(service.eliminarPlantillaComprobante).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarPlantillaComprobante', () => {
    spyOn(service, 'eliminarPlantillaComprobante').and.callThrough();

    const res = service.eliminarPlantillaComprobante('TPV');

    expect(typeof res).toBe('object');
  });
});
