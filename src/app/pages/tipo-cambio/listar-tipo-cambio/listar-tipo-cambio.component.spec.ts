import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoCambioComponent } from './listar-tipo-cambio.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { TipoCambio } from 'src/app/interfaces/tipo-cambio';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
let _TipoCambioService: TipoCambioService;
let listaTipoCambio: TipoCambio[];

describe('ListarTipoCambioComponent', () => {
  let component: ListarTipoCambioComponent;
  let fixture: ComponentFixture<ListarTipoCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarTipoCambioComponent],
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
    fixture = TestBed.createComponent(ListarTipoCambioComponent);
    component = fixture.componentInstance;
    _TipoCambioService = fixture.debugElement.injector.get(TipoCambioService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarTipoCambio');

    component.ngOnInit();
    expect(component.placeholderValue).toBe('Tipo de cambio');
  });

  it('Llama al método listarTipoCambio y retorna lista vacia', () => {
    spyOn(_TipoCambioService, 'listarTiposCambio').and.returnValue(
      of(listaTipoCambio)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTipoCambio y retorna lista', () => {
    listaTipoCambio = [
      {
        fecha: '01/02/2022',
        venta: 0,
        compra: 0,
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_TipoCambioService, 'listarTiposCambio').and.returnValue(
      of(listaTipoCambio)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoCambio', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_TipoCambioService, 'eliminarTipoCambio').and.returnValue(
      of(response)
    );

    component.eliminarTipoCambio('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoCambio y listarTipoCambio', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_TipoCambioService, 'eliminarTipoCambio').and.returnValue(
      of(response)
    );
    spyOn(_TipoCambioService, 'listarTiposCambio');

    component.eliminarTipoCambio('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarTipoCambio', () => {
    component.modificarTipoCambio('', 1);

    expect(component).toBeTruthy();
  });
});
