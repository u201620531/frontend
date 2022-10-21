import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarComprobanteComponent } from './cargar-comprobante.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { Comprobante } from 'src/app/interfaces/comprobante';

describe('CargarComprobanteComponent', () => {
  let component: CargarComprobanteComponent;
  let fixture: ComponentFixture<CargarComprobanteComponent>;
  let _ComprobanteService: ComprobanteService;
  let _ProveedorService: ProveedorService;
  let _FormaPagoService: FormaPagoService;
  let _MonedaService: MonedaService;
  let _TipoDocumentoService: TipoDocumentoService;
  let _TipoCambioService: TipoCambioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargarComprobanteComponent],
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
    fixture = TestBed.createComponent(CargarComprobanteComponent);
    component = fixture.componentInstance;
    _ComprobanteService = fixture.debugElement.injector.get(ComprobanteService);
    _ProveedorService = fixture.debugElement.injector.get(ProveedorService);
    _MonedaService = fixture.debugElement.injector.get(MonedaService);
    _FormaPagoService = fixture.debugElement.injector.get(FormaPagoService);
    _TipoCambioService = fixture.debugElement.injector.get(TipoCambioService);
    _TipoDocumentoService =
      fixture.debugElement.injector.get(TipoDocumentoService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'inicializarListados');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método inicializarListados', () => {
    spyOn(component, 'cantidadComprobantes');
    spyOn(component, 'listarProveedores');
    spyOn(component, 'listarTiposDocumento');
    spyOn(component, 'listarFormasPago');
    spyOn(component, 'listarMonedas');
    spyOn(component, 'listarTipoCambio');

    component.inicializarListados();

    expect(component).toBeTruthy();
  });

  it('Llama al método cantidadComprobantes', () => {
    _respuesta = {
      idProveedor: '1',
      razonSocial: 'prueba',
      nombreComercial: 'test',
      idTipoProveedor: 'J',
      idTipoDocumento: 'RUC',
      nroDocumento: '12345678',
      direccion: '',
      direccionFiscal: '',
      email1: '',
      email2: '',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_ComprobanteService, 'listarComprobante').and.returnValue(
      of(_respuesta)
    );

    component.cantidadComprobantes();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarProveedores', () => {
    _respuesta = {
      idProveedor: '1',
      razonSocial: 'prueba',
      nombreComercial: 'test',
      idTipoProveedor: 'J',
      idTipoDocumento: 'RUC',
      nroDocumento: '12345678',
      direccion: '',
      direccionFiscal: '',
      email1: '',
      email2: '',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_ProveedorService, 'listarPoveedores').and.returnValue(
      of(_respuesta)
    );

    component.listarProveedores();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTiposDocumento', () => {
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_TipoDocumentoService, 'listarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.listarTiposDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarMonedas', () => {
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_MonedaService, 'listarMonedas').and.returnValue(of(_respuesta));

    component.listarMonedas();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarFormasPago', () => {
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_FormaPagoService, 'listarFormaPago').and.returnValue(of(_respuesta));

    component.listarFormasPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTipoCambio', () => {
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_TipoCambioService, 'listarTiposCambio').and.returnValue(
      of(_respuesta)
    );

    component.listarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método limpiarListaComprobantesPorCargar', () => {
    component.limpiarListaComprobantesPorCargar();

    expect(component).toBeTruthy();
  });

  it('Llama al método cargarlistaComprobantesPorCargar', () => {
    component.cargarlistaComprobantesPorCargar();

    expect(component).toBeTruthy();
  });

  it('Llama al método validarRegistro', () => {
    const comprobanteValidar: any = {
      NRO_DOCUMENTO: '54545',
      RUC: '45454',
      TIPO_DOCUMENTO: 'FT',
      FORMA_PAGO: 'CON',
      TIPO_MONEDA: 'SOL',
      FECHA_EMISION: '01/01/2022',
      FECHA_VENCIMIENTO: '01/01/2022',
      TOTAL_GRAVADAS: 0,
      TOTAL_INAFECTAS: 0,
      TOTAL_EXONERADAS: 0,
      TOTAL_EXPORTACION: 0,
      VALOR_COMPRA: 0,
      IGV: 0,
      ISC: 0,
      OTROS_TRIBUTOS: 0,
      OTROS_CARGOS: 0,
      DESCUENTOS_GLOBALES: 0,
    };

    spyOn(component, 'validarNroDoumento');
    spyOn(component, 'validarProveedor');
    spyOn(component, 'validarTipoDocumento');
    spyOn(component, 'validarFormaPago');
    spyOn(component, 'validarMoneda');
    spyOn(component, 'validarValorFecha');
    spyOn(component, 'validarTipoCambio');
    spyOn(component, 'validarValorNumerico');

    component.validarRegistro(comprobanteValidar);

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarSeparador', () => {
    component.agregarSeparador('ttest');

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarSeparador con parametro vacío', () => {
    component.agregarSeparador('');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarNroDoumento con nrodocumento y separador vacío', () => {
    component.validarNroDoumento('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarNroDoumento con nrodocumento vacío y separador = "test"', () => {
    component.validarNroDoumento('', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarNroDoumento con nrodocumento ="XXX-1245""', () => {
    component.comprobante = {
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

    component.validarNroDoumento('XXX-12345', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarProveedor con idProveedor y separador vacío', () => {
    component.validarProveedor('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarProveedor con idProveedor vacío y separador = "test"', () => {
    component.validarProveedor('', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarProveedor con idProveedor ="01" y estado "I"', () => {
    component.listaProveedores = [
      {
        idProveedor: '01',
        razonSocial: 'TEST',
        idTipoProveedor: 'J',
        idTipoDocumento: 'FT',
        email1: 'test@gmail.com',
        email2: '',
        nombreComercial: '',
        nroDocumento: '111111111',
        estado: 'I',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarProveedor('01', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarProveedor con idProveedor ="01" y estado "A"', () => {
    component.listaProveedores = [
      {
        idProveedor: '01',
        razonSocial: 'TEST',
        idTipoProveedor: 'J',
        idTipoDocumento: 'FT',
        email1: 'test@gmail.com',
        email2: '',
        nombreComercial: '',
        nroDocumento: '111111111',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarProveedor('01', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoDocumento con idTipoDocumento y separador vacío', () => {
    component.validarTipoDocumento('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoDocumento con idTipoDocumento vacío y separador = "test"', () => {
    component.validarTipoDocumento('', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoDocumento con idTipoDocumento ="01" y estado "I"', () => {
    component.listaTiposDocumento = [
      {
        idTipoDocumento: '01',
        descripcion: 'Factura',
        abreviatura: 'FAC',
        asientos: 3,
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarTipoDocumento('01', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoDocumento con idTipoDocumento ="01" y estado "A"', () => {
    component.listaTiposDocumento = [
      {
        idTipoDocumento: '01',
        descripcion: 'Factura',
        abreviatura: 'FAC',
        asientos: 3,
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarTipoDocumento('01', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarFormaPago con idFormaPago y separador vacío', () => {
    component.validarFormaPago('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarFormaPago con idFormaPago vacío y separador = "test"', () => {
    component.validarFormaPago('', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarFormaPago con idFormaPago ="CON" y estado "I"', () => {
    component.listaFormasPago = [
      {
        idFormaPago: 'CON',
        descripcion: 'CONTADO',
        abreviatura: 'CON',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarFormaPago('CON', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarFormaPago con idFormaPago ="CON" y estado "A"', () => {
    component.listaFormasPago = [
      {
        idFormaPago: 'CON',
        descripcion: 'CONTADO',
        abreviatura: 'CON',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarFormaPago('CON', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarMoneda con idMoneda y separador vacío', () => {
    component.validarMoneda('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarMoneda con idMoneda vacío y separador = "test"', () => {
    component.validarMoneda('', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarMoneda con idMoneda ="MN" y estado "I"', () => {
    component.listaMonedas = [
      {
        idMoneda: 'MN',
        descripcion: 'MONEDA NACIONAL',
        abreviatura: 'MN',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarMoneda('MN', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarMoneda con idMoneda ="MN" y estado "A"', () => {
    component.listaMonedas = [
      {
        idMoneda: 'MN',
        descripcion: 'MONEDA NACIONAL',
        abreviatura: 'MN',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarMoneda('MN', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoCambio con fecha y separador vacío', () => {
    component.validarTipoCambio('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoCambio con fecha vacío y separador = "test"', () => {
    component.validarTipoCambio('', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoCambio con fecha ="2022-01-01" y estado "I"', () => {
    component.listaTipoCambio = [
      {
        fecha: '2022-01-01',
        compra: 3.99,
        venta: 4.01,
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarTipoCambio('01', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarTipoCambio con fecha ="2022-01-01" y estado "A"', () => {
    component.listaTipoCambio = [
      {
        fecha: '2022-01-01',
        compra: 3.99,
        venta: 4.01,
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    component.comprobante = {
      idComprobante: '',
      serie: '',
      correlativo: '',
      idTipoDocumento: '',
      idFormaPago: '',
      idProveedor: '01',
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

    component.validarTipoCambio('01', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorFecha con fecha =undefined, separador vacío y obligatorio=false', () => {
    component.validarValorFecha('', undefined, '', false);

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorFecha con fecha = "test", separador ="test" y obligatorio=true', () => {
    component.validarValorFecha('', 'test', 'test', true);

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorFecha con fecha = "13246", separador ="test" y obligatorio=true', () => {
    component.validarValorFecha('', '123456', 'test', true);

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorFecha con fecha = "1500-01-01", separador ="test" y obligatorio=true', () => {
    component.validarValorFecha('', '1500-01-01', 'test', true);

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorFecha con fecha = "2022-01-01", separador ="test" y obligatorio=true', () => {
    component.validarValorFecha('', '2022-01-01', 'test', true);

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorNumerico con cadena = undefined y separador vacío', () => {
    component.validarValorNumerico('', undefined, '');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorNumerico con cadena="test" y separador = "test"', () => {
    component.validarValorNumerico('', 'test', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método validarValorNumerico con cadena="123" y separador = "test"', () => {
    component.validarValorNumerico('', '123', 'test');

    expect(component).toBeTruthy();
  });

  it('Llama al método asignarValoresComprobantes con fechaEmision ="2022-01-01"', () => {
    let comprobanteRegistro: Comprobante = {
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
    const comprobantesPorCargar = {
      idComprobante: '00000001',
      serie: 'XXX',
      correlativo: '13456',
      idTipoDocumento: 'FT',
      idFormaPago: 'CON',
      idProveedor: 'J000001',
      fechaEmision: '2022-01-01',
      fechaVencimiento: '2022-01-31',
      totalGravadas: '',
      totalInafectas: '',
      totalExoneradas: '',
      totalExportacion: '',
      valorCompra: 0,
      igv: '',
      isc: '',
      otrosTributos: '',
      otrosCargos: '',
      descuentosGlobales: '',
      importeTotal: 0,
      tipoCambio: 4.0,
      idMoneda: 'MN',
      serieGuia: '',
      correlativoGuia: '',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };

    component.asignarValoresComprobantes(
      comprobanteRegistro,
      comprobantesPorCargar
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método asignarValoresComprobantes con fechaEmision =new Date()', () => {
    let comprobanteRegistro: Comprobante = {
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
    const comprobantesPorCargar = {
      idComprobante: '00000001',
      serie: 'XXX',
      correlativo: '13456',
      idTipoDocumento: 'FT',
      idFormaPago: 'CON',
      idProveedor: 'J000001',
      fechaEmision: new Date(),
      fechaVencimiento: new Date(),
      totalGravadas: 10,
      totalInafectas: 10,
      totalExoneradas: 10,
      totalExportacion: 10,
      valorCompra: 100,
      igv: 18,
      isc: 0,
      otrosTributos: 100,
      otrosCargos: 10,
      descuentosGlobales: 10,
      importeTotal: 118.0,
      tipoCambio: 4.0,
      idMoneda: 'MN',
      serieGuia: '',
      correlativoGuia: '',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };

    component.asignarValoresComprobantes(
      comprobanteRegistro,
      comprobantesPorCargar
    );

    expect(component).toBeTruthy();
  });
});
