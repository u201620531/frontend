import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuentaContableComponent } from './listar-cuenta-contable.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { CuentaContable } from 'src/app/interfaces/cuenta-contable';
import { of } from 'rxjs';

describe('ListarCuentaContableComponent', () => {
  let component: ListarCuentaContableComponent;
  let fixture: ComponentFixture<ListarCuentaContableComponent>;
  let _CuentaContableService: CuentaContableService;
  let listaCuentaContable: CuentaContable[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarCuentaContableComponent],
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
    fixture = TestBed.createComponent(ListarCuentaContableComponent);
    component = fixture.componentInstance;
    _CuentaContableService = fixture.debugElement.injector.get(
      CuentaContableService
    );
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    expect(component.placeholderValue).toBe('Cuenta contable');
  });

  it('Llama al método listarCuentaContable y retorna lista vacia', () => {
    spyOn(_CuentaContableService, 'listarCuentasContables').and.returnValue(
      of(listaCuentaContable)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarCuentaContable y retorna lista', () => {
    listaCuentaContable = [
      {
        idCuentaContable: 'CON',
        nombre: '',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_CuentaContableService, 'listarCuentasContables').and.returnValue(
      of(listaCuentaContable)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarCuentaContable', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_CuentaContableService, 'eliminarCuentaContable').and.returnValue(
      of(response)
    );

    component.eliminarCuentaContable('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarCuentaContable y listarCuentaContable', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_CuentaContableService, 'eliminarCuentaContable').and.returnValue(
      of(response)
    );
    spyOn(_CuentaContableService, 'listarCuentasContables');

    component.eliminarCuentaContable('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarCuentaContable', () => {
    component.modificarCuentaContable('', 1);

    expect(component).toBeTruthy();
  });
});
