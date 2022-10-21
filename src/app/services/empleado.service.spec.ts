import { TestBed } from '@angular/core/testing';
import { EmpleadoService } from './empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { Empleado } from '../interfaces/empleado';

describe('EmpleadoService', () => {
  let service: EmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(EmpleadoService);
  });

  it('Crear Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Llama al método listarEmpleados y retorna error', () => {
    spyOn(service, 'listarEmpleados').and.throwError('error');

    const res = expect(service.listarEmpleados).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método listarEmpleados', () => {
    spyOn(service, 'listarEmpleados').and.callThrough();

    const res = service.listarEmpleados();

    expect(typeof res).toBe('object');
  });

  it('Llama al método listarEmpleadoPoridEmpleado y retorna error', () => {
    spyOn(service, 'listarEmpleadoPoridEmpleado').and.throwError('error');

    const res = expect(service.listarEmpleadoPoridEmpleado).toThrowError(
      'error'
    );

    expect(res).toBeUndefined();
  });

  it('Llama al método listarEmpleadoPoridEmpleado', () => {
    spyOn(service, 'listarEmpleadoPoridEmpleado').and.callThrough();

    const res = service.listarEmpleadoPoridEmpleado('4200121');

    expect(typeof res).toBe('object');
  });

  it('Llama al método agregarEmpleado y retorna error', () => {
    spyOn(service, 'agregarEmpleado').and.throwError('error');

    const res = expect(service.agregarEmpleado).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método agregarEmpleado', () => {
    const aud: Empleado = {
      idEmpleado: '01',
      nombre: 'test',
      apellido: '',
      idCargo: '',
      email1: '',
      email2: '',
      telefono: '',
      fechaNacimiento: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'agregarEmpleado').and.callThrough();

    const res = service.agregarEmpleado(aud);

    expect(typeof res).toBe('object');
  });

  it('Llama al método actualizarEmpleado y retorna error', () => {
    spyOn(service, 'actualizarEmpleado').and.throwError('error');

    const res = expect(service.actualizarEmpleado).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método actualizarEmpleado', () => {
    const aud: Empleado = {
      idEmpleado: '01',
      nombre: 'test',
      apellido: '',
      idCargo: '',
      email1: '',
      email2: '',
      telefono: '',
      fechaNacimiento: '',
      estado: 'A',
      fechaCreacion: '',
      usuarioCreacion: 'admin',
    };
    spyOn(service, 'actualizarEmpleado').and.callThrough();

    const res = service.actualizarEmpleado(aud, '4200121');

    expect(typeof res).toBe('object');
  });

  it('Llama al método eliminarEmpleado y retorna error', () => {
    spyOn(service, 'eliminarEmpleado').and.throwError('error');

    const res = expect(service.eliminarEmpleado).toThrowError('error');

    expect(res).toBeUndefined();
  });

  it('Llama al método eliminarEmpleado', () => {
    spyOn(service, 'eliminarEmpleado').and.callThrough();

    const res = service.eliminarEmpleado('4200121');

    expect(typeof res).toBe('object');
  });
});
