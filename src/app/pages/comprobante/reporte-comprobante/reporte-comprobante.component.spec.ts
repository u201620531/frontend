import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReporteComprobanteComponent } from './reporte-comprobante.component';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { of } from 'rxjs';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { SoporteService } from 'src/app/services/soporte.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';

describe('ReporteComprobanteComponent', () => {
  let component: ReporteComprobanteComponent;
  let fixture: ComponentFixture<ReporteComprobanteComponent>;
  let _ComprobanteService: ComprobanteService;
  let _TipoDocumentoService: TipoDocumentoService;
  let _SoporteService: SoporteService;
  let _FormaPagoService: FormaPagoService;
  let _MonedaService: MonedaService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteComprobanteComponent],
      imports: [HttpClientModule, MatSnackBarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteComprobanteComponent);
    component = fixture.componentInstance;
    _ComprobanteService = fixture.debugElement.injector.get(ComprobanteService);
    _FormaPagoService = fixture.debugElement.injector.get(FormaPagoService);
    _MonedaService = fixture.debugElement.injector.get(MonedaService);
    _TipoDocumentoService =
      fixture.debugElement.injector.get(TipoDocumentoService);
    _SoporteService = fixture.debugElement.injector.get(SoporteService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarFormasPago');
    spyOn(component, 'listarMonedas');
    spyOn(component, 'listarTiposDocumento');
    spyOn(component, 'listarEstados');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTiposDocumento', () => {
    _respuesta = {
      id: 1,
      value: 'test',
    };

    spyOn(_TipoDocumentoService, 'listarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.listarTiposDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarMonedas', () => {
    _respuesta = {
      id: 1,
      value: 'test',
    };

    spyOn(_MonedaService, 'listarMonedas').and.returnValue(of(_respuesta));

    component.listarMonedas();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarFormasPago', () => {
    _respuesta = {
      id: 1,
      value: 'test',
    };

    spyOn(_FormaPagoService, 'listarFormaPago').and.returnValue(of(_respuesta));

    component.listarFormasPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarEstados', () => {
    _respuesta = {
      id: 1,
      value: 'test',
    };

    spyOn(_SoporteService, 'listarSoporteById').and.returnValue(of(_respuesta));

    component.listarEstados();

    expect(component).toBeTruthy();
  });

  it('Llama al método cleanFilters', () => {
    component.cleanFilters();

    expect(component.estado).toBe('');
  });

  it('Llama al método descargarReporte y retorna lista vacia', () => {
    component.nroDocumento = '';
    component.idTipoDocumento = '';
    component.idFormaPago = '';
    component.idMoneda = '';
    component.estado = '';
    component.rangeDates.value.start = null;
    component.rangeDates.value.end = null;
    _respuesta = [];

    spyOn(component, 'generarReporte');
    spyOn(_ComprobanteService, 'reporteComprobante').and.returnValue(
      of(_respuesta)
    );

    component.listarEstados();

    expect(component).toBeTruthy();
  });

  it('Llama al método descargarReporte y retorna lista', () => {
    component.nroDocumento = '1245421';
    component.idTipoDocumento = 'FT';
    component.idFormaPago = 'CON';
    component.idMoneda = 'MN';
    component.estado = 'A';
    component.rangeDates.value.start = new Date();
    component.rangeDates.value.end = new Date();
    _respuesta = [
      {
        idComprobante: '001',
        serie: '000',
        correlativo: '1235',
        idFormaPago: 'CON',
        idMoneda: 'MN',
        idProveedor: '12345678901',
        idTipoDocumento: 'FT',
        valorCompra: 100,
        igv: 18,
        importeTotal: 118,
        fechaCreacion: '2022-01-01',
        fechaEmision: '2022-01-01',
        fechaVencimiento: '2022-01-01',
        tipoCambio: 0,
        estado: 'A',
        usuarioCreacion: 'test',
      },
    ];

    spyOn(_ComprobanteService, 'reporteComprobante').and.returnValue(
      of(_respuesta)
    );

    component.listarEstados();

    expect(component).toBeTruthy();
  });

  it('Llama al método generarReporte', () => {
    component.listaComprobantes = [
      {
        idComprobante: '001',
        serie: '000',
        correlativo: '1235',
        idFormaPago: 'CON',
        idMoneda: 'MN',
        idProveedor: '12345678901',
        idTipoDocumento: 'FT',
        valorCompra: 100,
        igv: 18,
        importeTotal: 118,
        fechaCreacion: '2022-01-01',
        fechaEmision: '2022-01-01',
        fechaVencimiento: '2022-01-01',
        tipoCambio: 0,
        estado: 'A',
        usuarioCreacion: 'test',
      },
    ];

    component.generarReporte();

    expect(component).toBeTruthy();
  });
});
