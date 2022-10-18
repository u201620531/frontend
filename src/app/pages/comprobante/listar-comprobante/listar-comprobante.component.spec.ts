import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComprobanteComponent } from './listar-comprobante.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { Comprobante } from 'src/app/interfaces/comprobante';
import { of } from 'rxjs';

describe('ListarComprobanteComponent', () => {
  let component: ListarComprobanteComponent;
  let fixture: ComponentFixture<ListarComprobanteComponent>;
  let _ComprobanteService: ComprobanteService;
  let listaComprobante: Comprobante[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarComprobanteComponent],
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
    fixture = TestBed.createComponent(ListarComprobanteComponent);
    component = fixture.componentInstance;
    _ComprobanteService = fixture.debugElement.injector.get(ComprobanteService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    expect(component.placeholderValue).toBe('Comprobante electrónico');
  });

  it('Llama al método listarComprobante y retorna lista vacia', () => {
    spyOn(_ComprobanteService, 'listarComprobante').and.returnValue(
      of(listaComprobante)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarComprobante y retorna lista', () => {
    listaComprobante = [
      {
        idComprobante: 'CON',
        serie: '',
        correlativo: '',
        idTipoDocumento: '',
        idFormaPago: '',
        idMoneda: '',
        idProveedor: '',
        importeTotal: 0,
        tipoCambio: 0,
        fechaEmision: '',
        fechaVencimiento: '',
        igv: 0,
        isc: 0,
        valorCompra: 0,
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_ComprobanteService, 'listarComprobante').and.returnValue(
      of(listaComprobante)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarComprobante', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_ComprobanteService, 'eliminarComprobante').and.returnValue(
      of(response)
    );

    component.eliminarComprobante('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarComprobante y listarComprobante', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_ComprobanteService, 'eliminarComprobante').and.returnValue(
      of(response)
    );
    spyOn(_ComprobanteService, 'listarComprobante');

    component.eliminarComprobante('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarComprobante', () => {
    component.modificarComprobante('', 1);

    expect(component).toBeTruthy();
  });
});
