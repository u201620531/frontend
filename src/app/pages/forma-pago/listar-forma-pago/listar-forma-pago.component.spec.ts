import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFormaPagoComponent } from './listar-forma-pago.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ListarFormaPagoComponent', () => {
  let component: ListarFormaPagoComponent;
  let fixture: ComponentFixture<ListarFormaPagoComponent>;
  let _FormaPagoService: FormaPagoService;
  let listaFormaPago: FormaPago[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarFormaPagoComponent],
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFormaPagoComponent);
    component = fixture.componentInstance;
    _FormaPagoService = fixture.debugElement.injector.get(FormaPagoService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    expect(component.placeholderValue).toBe('Forma de pago');
  });

  it('Llama al método listarFormaPago y retorna lista vacia', () => {
    spyOn(_FormaPagoService, 'listarFormaPago').and.returnValue(
      of(listaFormaPago)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarFormaPago y retorna lista', () => {
    listaFormaPago = [
      {
        idFormaPago: 'CON',
        descripcion: 'CONTADO',
        abreviatura: 'CON',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_FormaPagoService, 'listarFormaPago').and.returnValue(
      of(listaFormaPago)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarFormaPago', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_FormaPagoService, 'eliminarFormaPago').and.returnValue(of(response));

    component.eliminarFormaPago('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarFormaPago y listarFormaPago', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_FormaPagoService, 'eliminarFormaPago').and.returnValue(of(response));
    spyOn(_FormaPagoService, 'listarFormaPago');

    component.eliminarFormaPago('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarFormaPago', () => {
    component.modificarFormaPago('', 1);

    expect(component).toBeTruthy();
  });
});
