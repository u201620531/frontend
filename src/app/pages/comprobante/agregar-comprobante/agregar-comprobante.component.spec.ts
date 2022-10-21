import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComprobanteComponent } from './agregar-comprobante.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';

describe('AgregarComprobanteComponent', () => {
  let component: AgregarComprobanteComponent;
  let fixture: ComponentFixture<AgregarComprobanteComponent>;
  let _ComprobanteService: ComprobanteService;
  let _ProveedorService: ProveedorService;
  let _FormaPagoService: FormaPagoService;
  let _MonedaService: MonedaService;
  let _TipoDocumentoService: TipoDocumentoService;
  let _TipoCambioService: TipoCambioService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarComprobanteComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        RouterModule,
        RouterTestingModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComprobanteComponent);
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
    spyOn(component, 'listarProveedores');
    spyOn(component, 'listarMoneda');
    spyOn(component, 'listarFormaPago');
    spyOn(component, 'listarTipoDocumento');
    spyOn(component, 'initParams');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarProveedoresFiltro', () => {
    component.listarProveedoresFiltro();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarProveedor', () => {
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

    spyOn(_ProveedorService, 'listarProveedorPoridProveedor').and.returnValue(
      of(_respuesta)
    );

    component.listarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método displayFn', () => {
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
      ComprobanteCreacion: 'admin',
    };

    component.displayFn(_respuesta);

    expect(component).toBeTruthy();
  });

  it('Llama al método listarProveedor', () => {
    component.IdComprobante = '0000000001';
    _respuesta = {
      idProveedor: 'j001',
      fechaEmision: '2022-01-01',
      fechaVencimiento: '2022-01-31',
      idComprobante: '000001',
      serie: 'x12',
      correlativo: '4545',
      idTipoDocumento: 'FT',
      idFormaPago: 'CON',
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
      idMoneda: 'MN',
      serieGuia: '',
      correlativoGuia: '',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
      ComprobanteCreacion: 'admin',
    };

    spyOn(component, 'listarProveedor');
    spyOn(_ComprobanteService, 'listarComprobantePorId').and.returnValue(
      of(_respuesta)
    );

    component.listarComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idComprobante'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams con parametros', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idComprobante'] = '000001';
    });

    spyOn(component, 'listarComprobante');

    component.initParams();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarProveedores', () => {
    _respuesta = {
      idProveedor: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      ComprobanteCreacion: 'admin',
    };

    spyOn(_ProveedorService, 'listarPoveedores').and.returnValue(
      of(_respuesta)
    );

    component.listarProveedores();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTipoDocumento', () => {
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

    component.listarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarMoneda', () => {
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

    component.listarMoneda();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarFormaPago', () => {
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

    component.listarFormaPago();

    expect(component).toBeTruthy();
  });

  // it('Llama al método agregarComprobante, modificar = true y retorna ok', () => {
  //   component.form.value.idComprobante = '00001';
  //   component.form.value.serie = 'test';
  //   component.form.value.correlativo = '111111';
  //   component.form.value.idTipoDocumento = 'FT';
  //   component.form.value.idFormaPago = 'CON';
  //   component.form.value.idProveedor.idProveedor = 'J0001';
  //   component.proveedor = {
  //     idProveedor: 'J0001',
  //     nroDocumento: '1345678',
  //     razonSocial: 'test',
  //     email1: 'test',
  //     direccion: 'av. las flores',
  //     direccionFiscal: '',
  //     usuarioCreacion: 'test',
  //     email2: '',
  //     estado: 'A',
  //     fechaCreacion: '2022-01-01',
  //     idTipoDocumento: 'DNI',
  //     idTipoProveedor: 'J',
  //   };
  //   component.form.value.fechaEmision = '2022-01-01';
  //   component.form.value.fechaVencimiento = '2022-01-31';
  //   component.form.value.totalGravadas = 0;
  //   component.form.value.totalInafectas = 0;
  //   component.form.value.totalExoneradas = 0;
  //   component.form.value.totalExportacion = 0;
  //   component.form.value.valorCompra = 0;
  //   component.form.value.igv = 0;
  //   component.form.value.isc = 0;
  //   component.form.value.otrosCargos = 0;
  //   component.form.value.otrosTributos = 0;
  //   component.form.value.descuentosGlobales = 0;
  //   component.form.value.importeTotal = 0;
  //   component.form.value.tipoCambio = 0;
  //   component.form.value.idMoneda = 'MN';
  //   component.form.value.serieGuia = '';
  //   component.form.value.correlativoGuia = '';
  //   component.form.value.estado = 'A';
  //   component.form.value.fechaCreacion = '2022-01-01';
  //   component.form.value.ComprobanteCreacion = 'test';

  //   component.modificar = true;

  //   _respuesta = {
  //     id: '1',
  //     message: 'ok',
  //     detail: '',
  //   };

  //   spyOn(_ComprobanteService, 'actualizarComprobante').and.returnValue(
  //     of(_respuesta)
  //   );

  //   component.agregarComprobante();

  //   expect(component).toBeTruthy();
  // });

  // it('Llama al método agregarComprobante, modificar = true y retorna error', () => {
  //   component.form.value.idComprobante = '00001';
  //   component.form.value.serie = 'test';
  //   component.form.value.correlativo = '111111';
  //   component.form.value.idTipoDocumento = '';
  //   component.form.value.idFormaPago = '';
  //   component.form.value.idProveedor.idProveedor = 'J0001';
  //   component.proveedor = {
  //     idProveedor: 'J0001',
  //     nroDocumento: '',
  //     razonSocial: '',
  //     email1: '',
  //     email2: '',
  //     estado: '',
  //     fechaCreacion: '',
  //     idTipoDocumento: '',
  //     idTipoProveedor: '',
  //   };
  //   component.form.value.fechaEmision = '2022-01-01';
  //   component.form.value.fechaVencimiento = '2022-12-31';
  //   component.form.value.totalGravadas = 0;
  //   component.form.value.totalInafectas = 0;
  //   component.form.value.totalExoneradas = 0;
  //   component.form.value.totalExportacion = 0;
  //   component.form.value.valorCompra = 0;
  //   component.form.value.igv = 0;
  //   component.form.value.isc = 0;
  //   component.form.value.otrosCargos = 0;
  //   component.form.value.otrosTributos = 0;
  //   component.form.value.descuentosGlobales = 0;
  //   component.form.value.importeTotal = 0;
  //   component.form.value.tipoCambio = 0;
  //   component.form.value.idMoneda = 'MN';
  //   component.form.value.serieGuia = '';
  //   component.form.value.correlativoGuia = '';
  //   component.form.value.estado = 'A';
  //   component.form.value.fechaCreacion = '2022-01-01';
  //   component.form.value.ComprobanteCreacion = 'test';

  //   component.modificar = true;

  //   _respuesta = {
  //     id: '0',
  //     message: 'error',
  //     detail: '',
  //   };

  //   spyOn(_ComprobanteService, 'actualizarComprobante').and.returnValue(
  //     of(_respuesta)
  //   );

  //   component.agregarComprobante();

  //   expect(component).toBeTruthy();
  // });

  // it('Llama al método agregarComprobante, modificar = false y retorna ok', () => {
  //   component.form.value.idComprobante = '00001';
  //   component.form.value.serie = 'test';
  //   component.form.value.correlativo = '111111';
  //   component.form.value.idTipoDocumento = '';
  //   component.form.value.idFormaPago = '';
  //   component.form.value.idProveedor.idProveedor = 'J0001';
  //   component.proveedor = {
  //     idProveedor: 'J0001',
  //     nroDocumento: '',
  //     razonSocial: '',
  //     email1: '',
  //     email2: '',
  //     estado: '',
  //     fechaCreacion: '',
  //     idTipoDocumento: '',
  //     idTipoProveedor: '',
  //   };
  //   component.form.value.fechaEmision = '';
  //   component.form.value.fechaVencimiento = '';
  //   component.form.value.totalGravadas = 0;
  //   component.form.value.totalInafectas = 0;
  //   component.form.value.totalExoneradas = 0;
  //   component.form.value.totalExportacion = 0;
  //   component.form.value.valorCompra = 0;
  //   component.form.value.igv = 0;
  //   component.form.value.isc = 0;
  //   component.form.value.otrosCargos = 0;
  //   component.form.value.otrosTributos = 0;
  //   component.form.value.descuentosGlobales = 0;
  //   component.form.value.importeTotal = 0;
  //   component.form.value.tipoCambio = 0;
  //   component.form.value.idMoneda = 'MN';
  //   component.form.value.serieGuia = '';
  //   component.form.value.correlativoGuia = '';
  //   component.form.value.estado = 'A';
  //   component.form.value.fechaCreacion = '2022-01-01';
  //   component.form.value.ComprobanteCreacion = 'test';
  //   component.form.value.estado = 'A';
  //   component.form.value.fechaCreacion = '2022-01-01';
  //   component.form.value.ComprobanteCreacion = 'test';

  //   component.modificar = false;

  //   _respuesta = {
  //     id: '1',
  //     message: 'ok',
  //     detail: '',
  //   };

  //   spyOn(_ComprobanteService, 'agregarComprobante').and.returnValue(
  //     of(_respuesta)
  //   );

  //   component.agregarComprobante();

  //   expect(component).toBeTruthy();
  // });

  // it('Llama al método agregarComprobante, modificar = false y retorna error', () => {
  //   component.form.value.idComprobante = '00001';
  //   component.form.value.serie = 'test';
  //   component.form.value.correlativo = '111111';
  //   component.form.value.idTipoDocumento = '';
  //   component.form.value.idFormaPago = '';
  //   component.form.value.idProveedor.idProveedor = 'J0001';
  //   component.proveedor = {
  //     idProveedor: 'J0001',
  //     nroDocumento: '',
  //     razonSocial: '',
  //     email1: '',
  //     email2: '',
  //     estado: '',
  //     fechaCreacion: '',
  //     idTipoDocumento: '',
  //     idTipoProveedor: '',
  //   };
  //   component.form.value.fechaEmision = '';
  //   component.form.value.fechaVencimiento = '';
  //   component.form.value.totalGravadas = 0;
  //   component.form.value.totalInafectas = 0;
  //   component.form.value.totalExoneradas = 0;
  //   component.form.value.totalExportacion = 0;
  //   component.form.value.valorCompra = 0;
  //   component.form.value.igv = 0;
  //   component.form.value.isc = 0;
  //   component.form.value.otrosCargos = 0;
  //   component.form.value.otrosTributos = 0;
  //   component.form.value.descuentosGlobales = 0;
  //   component.form.value.importeTotal = 0;
  //   component.form.value.tipoCambio = 0;
  //   component.form.value.idMoneda = 'MN';
  //   component.form.value.serieGuia = '';
  //   component.form.value.correlativoGuia = '';
  //   component.form.value.estado = 'A';
  //   component.form.value.fechaCreacion = '2022-01-01';
  //   component.form.value.ComprobanteCreacion = 'test';
  //   component.form.value.estado = 'A';
  //   component.form.value.fechaCreacion = '2022-01-01';
  //   component.form.value.ComprobanteCreacion = 'test';

  //   component.modificar = false;

  //   _respuesta = {
  //     id: '0',
  //     message: 'error',
  //     detail: '',
  //   };

  //   spyOn(_ComprobanteService, 'agregarComprobante').and.returnValue(
  //     of(_respuesta)
  //   );

  //   component.agregarComprobante();

  //   expect(component).toBeTruthy();
  //  });

  it('Llama al método eliminarComprobante, confirmation = true y retorna ok', () => {
    component.confirmacion = true;
    component.form.value.idComprobante = '0001';

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_ComprobanteService, 'eliminarComprobante').and.returnValue(
      of(_respuesta)
    );

    component.eliminarComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarComprobante, confirmation = false y retorna ok', () => {
    component.confirmacion = false;
    component.form.value.idComprobante = '0001';

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_ComprobanteService, 'eliminarComprobante').and.returnValue(
      of(_respuesta)
    );

    component.eliminarComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarComprobante, modificar = false y retorna error', () => {
    component.confirmacion = true;
    component.form.value.idComprobante = '0001';

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_ComprobanteService, 'eliminarComprobante').and.returnValue(
      of(_respuesta)
    );

    component.eliminarComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });

  it('Llama al método asignarTipoCambio', () => {
    component.form.value.fechaEmision = new Date();

    _respuesta = {
      id: undefined,
      compra: 10,
      detail: '',
    };

    spyOn(_TipoCambioService, 'listaTipoCambioPorfecha').and.returnValue(
      of(_respuesta)
    );

    component.asignarTipoCambio();

    expect(component).toBeTruthy();
  });
});
