import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpleadoComponent } from './listar-empleado.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/interfaces/empleado';
import { of } from 'rxjs';

describe('ListarEmpleadoComponent', () => {
  let component: ListarEmpleadoComponent;
  let fixture: ComponentFixture<ListarEmpleadoComponent>;
  let _EmpleadoService: EmpleadoService;
  let listaEmpleado: Empleado[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarEmpleadoComponent],
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEmpleadoComponent);
    component = fixture.componentInstance;
    _EmpleadoService = fixture.debugElement.injector.get(EmpleadoService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarEmpleados');

    component.ngOnInit();
    expect(component.placeholderValue).toBe('Empleado');
  });

  it('Llama al método listarEmpleado y retorna lista vacia', () => {
    spyOn(_EmpleadoService, 'listarEmpleados').and.returnValue(
      of(listaEmpleado)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarEmpleado y retorna lista', () => {
    listaEmpleado = [
      {
        idEmpleado: 'CON',
        apellido: 'A',
        nombre: 'N',
        idCargo: 'C01',
        fechaNacimiento: '2022-01-01',
        telefono: '',
        direccion: '',
        email1: '',
        email2: '',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_EmpleadoService, 'listarEmpleados').and.returnValue(
      of(listaEmpleado)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarEmpleado', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_EmpleadoService, 'eliminarEmpleado').and.returnValue(of(response));

    component.eliminarEmpleado('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarEmpleado y listarEmpleado', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_EmpleadoService, 'eliminarEmpleado').and.returnValue(of(response));
    spyOn(_EmpleadoService, 'listarEmpleados');

    component.eliminarEmpleado('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarEmpleado', () => {
    component.modificarEmpleado('', 1);

    expect(component).toBeTruthy();
  });
});
