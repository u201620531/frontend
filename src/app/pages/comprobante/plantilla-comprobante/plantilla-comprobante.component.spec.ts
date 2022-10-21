import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantillaComprobanteComponent } from './plantilla-comprobante.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CorrelativoPlantillaComprobanteService } from 'src/app/services/correlativo-plantilla-comprobante.service';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { DetallePlantillaComprobanteService } from 'src/app/services/detalle-plantilla-comprobante.service';
import { PlantillaComprobanteService } from 'src/app/services/plantilla-comprobante.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CuentaContable } from 'src/app/interfaces/cuenta-contable';

describe('PlantillaComprobanteComponent', () => {
  let component: PlantillaComprobanteComponent;
  let fixture: ComponentFixture<PlantillaComprobanteComponent>;
  let _CorrelativoPlantillaComprobanteService: CorrelativoPlantillaComprobanteService;
  let _CuentaContableService: CuentaContableService;
  let _PlantillaComprobanteService: PlantillaComprobanteService;
  let _DetallePlantillaComprobanteService: DetallePlantillaComprobanteService;
  let _respuesta: any;
  let _formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantillaComprobanteComponent],
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaComprobanteComponent);
    component = fixture.componentInstance;
    _PlantillaComprobanteService = fixture.debugElement.injector.get(
      PlantillaComprobanteService
    );
    _DetallePlantillaComprobanteService = fixture.debugElement.injector.get(
      DetallePlantillaComprobanteService
    );
    _CuentaContableService = fixture.debugElement.injector.get(
      CuentaContableService
    );
    _CorrelativoPlantillaComprobanteService = fixture.debugElement.injector.get(
      CorrelativoPlantillaComprobanteService
    );
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarCuentasContables');
    spyOn(component, 'listarPlantilla');
    spyOn(component, 'listarDetallePlantilla');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarCuentasContables', () => {
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

    spyOn(_CuentaContableService, 'listarCuentasContables').and.returnValue(
      of(_respuesta)
    );

    component.listarCuentasContables();

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams con idPlantillaComprobante=undefined', () => {
    component._route.queryParams.subscribe((params) => {
      params['idPlantillaComprobante'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método listarPlanitlla con idPlantillaComprobante="001"', () => {
    _respuesta = {
      idPlantillaComprobante: '001',
      nroTicketEnvio: '123',
      fechaCarga: '2022-01-01',
      fechaDeclaracion: '2022-01-01',
      observacion: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component._route.queryParams.subscribe((params) => {
      params['idPlantillaComprobante'] = '001';
    });
    spyOn(
      _PlantillaComprobanteService,
      'listarPlantillaComprobantePorId'
    ).and.returnValue(of(_respuesta));

    component.listarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarDetallePlantilla', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idPlantillaComprobante'] = undefined;
    });

    component.listarDetallePlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarDetallePlantilla con idPlantillaComprobante="001"', () => {
    _respuesta = {
      idPlantillaComprobante: '001',
      nroTicketEnvio: '123',
      fechaCarga: '2022-01-01',
      fechaDeclaracion: '2022-01-01',
      observacion: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component._route.queryParams.subscribe((params) => {
      params['idPlantillaComprobante'] = '001';
      params['modificar'] = '0';
    });
    spyOn(
      _PlantillaComprobanteService,
      'listarPlantillaComprobantePorId'
    ).and.returnValue(of(_respuesta));

    component.listarDetallePlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarCorrelativo', () => {
    _respuesta = {
      ano: 2022,
      mes: 1,
      correlativo: undefined,
    };
    component.form.value.fechaCarga = '2022-01-01';
    spyOn(
      _CorrelativoPlantillaComprobanteService,
      'listarCorrelativoPlantillaComprobantePorAnoyMes'
    ).and.returnValue(of(_respuesta));

    component.listarCorrelativo();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarCorrelativo con correlativo', () => {
    _respuesta = {
      ano: 2022,
      mes: 1,
      correlativo: 5,
    };
    component.form.value.fechaCarga = '2022-01-01';
    spyOn(
      _CorrelativoPlantillaComprobanteService,
      'listarCorrelativoPlantillaComprobantePorAnoyMes'
    ).and.returnValue(of(_respuesta));

    component.listarCorrelativo();

    expect(component).toBeTruthy();
  });

  it('Llama al método asignarCorrelativo', () => {
    spyOn(component, 'listarCorrelativo');

    component.asignarCorrelativo();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarPlantillaComprobante, retorna ok', () => {
    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };
    spyOn(
      _PlantillaComprobanteService,
      'eliminarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));
    component.eliminarPlantillaComprobante('0001');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarPlantillaComprobante, retorna error', () => {
    _respuesta = {
      id: '0',
      message: 'ok',
      detail: '',
    };
    spyOn(
      _PlantillaComprobanteService,
      'eliminarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));
    component.eliminarPlantillaComprobante('0001');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarDetallePlantillaComprobante, retorna id=1', () => {
    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };
    spyOn(component, 'listarDetallePlantilla');
    spyOn(
      _DetallePlantillaComprobanteService,
      'eliminarDetallePlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.eliminarDetallePlantillaComprobante('0001', '0001');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarDetallePlantillaComprobante, retorna id=0', () => {
    _respuesta = {
      id: '0',
      message: 'ok',
      detail: '',
    };
    spyOn(
      _DetallePlantillaComprobanteService,
      'eliminarDetallePlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.eliminarDetallePlantillaComprobante('0001', '0001');

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });

  it('Llama al método asignarValoresPlantilla, retorna id=0', () => {
    component.listaDetallePlantillaComprobante = [
      {
        select: '1',
        idComprobante: '000001',
        asiTipoDocumento: 3,
        abrMoneda: 'MN',
        razonSocial: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        serie: 'XXX',
        correlativo: '1245',
        fechaEmision: '2022-01-01',
        nroDocumento: '1231321321',
        abrTipoDocumento: 'FT',
        valorCompra: 100.0,
        igv: 18.0,
        importeTotal: 118.0,
        fechaVencimiento: '',
      },
    ];
    component.mesCarga = '01';
    component.numCorrelativo = 10;
    component.fechaCarga = '2022-01-01';
    let cue: CuentaContable = {
      idCuentaContable: '421201',
      nombre: '11111',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);
    cue = {
      idCuentaContable: '421202',
      nombre: '222222',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);
    cue = {
      idCuentaContable: '639999',
      nombre: '3333333',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);
    cue = {
      idCuentaContable: '401111',
      nombre: '444444444444444',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);
    // component.listaCuentasContables = [
    //   {
    //     idCuentaContable: '421201',
    //     nombre: '11111',
    //     estado: 'A',
    //     fechaCreacion: '2022-01-01',
    //     usuarioCreacion: 'test',
    //   },
    //   {
    //     idCuentaContable: '421202',
    //     nombre: '2222222',
    //     estado: 'A',
    //     fechaCreacion: '2022-01-01',
    //     usuarioCreacion: 'test',
    //   },
    //   {
    //     idCuentaContable: '639999',
    //     nombre: '33333333333',
    //     estado: 'A',
    //     fechaCreacion: '2022-01-01',
    //     usuarioCreacion: 'test',
    //   },
    // ];

    component.asignarValoresPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método asignarValoresPlantilla con fechaVencimiento = "2022-12-01"', () => {
    component.listaDetallePlantillaComprobante = [
      {
        select: '1',
        idComprobante: '000001',
        asiTipoDocumento: 2,
        abrMoneda: 'ME',
        razonSocial: 'XXXXXXXXX',
        serie: 'XXX',
        correlativo: '1245',
        fechaEmision: '2022-04-15',
        nroDocumento: '1231321321',
        abrTipoDocumento: 'NC',
        valorCompra: 100.0,
        igv: 18.0,
        importeTotal: 118.0,
        fechaVencimiento: '2022-12-01',
      },
    ];
    component.mesCarga = '01';
    component.numCorrelativo = 0;
    component.fechaCarga = '2022-01-01';
    // component.listaCuentasContables = [
    //   {
    //     idCuentaContable: '421201',
    //     nombre: '11111',
    //     estado: 'A',
    //     fechaCreacion: '2022-01-01',
    //     usuarioCreacion: 'test',
    //   },
    //   {
    //     idCuentaContable: '421202',
    //     nombre: '2222222',
    //     estado: 'A',
    //     fechaCreacion: '2022-01-01',
    //     usuarioCreacion: 'test',
    //   },
    //   {
    //     idCuentaContable: '639999',
    //     nombre: '33333333333',
    //     estado: 'A',
    //     fechaCreacion: '2022-01-01',
    //     usuarioCreacion: 'test',
    //   },
    // ];
    let cue: CuentaContable = {
      idCuentaContable: '421201',
      nombre: '11111',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);
    cue = {
      idCuentaContable: '421202',
      nombre: '222222',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);
    cue = {
      idCuentaContable: '639999',
      nombre: '3333333',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'test',
    };
    component.listaCuentasContables.push(cue);

    component.asignarValoresPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método generarPlantilla con fechaCarga vacía', () => {
    component.form.value.fechaCarga = '';

    component.generarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método generarPlantilla con validaRegistro false', () => {
    component.form.value.fechaCarga = '2022-01-01';
    component.validaRegistro = false;
    spyOn(component, 'descargarPlantilla');

    component.generarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método generarPlantilla con validaRegistro true', () => {
    component.form.value.fechaCarga = '2022-01-01';
    component.validaRegistro = true;
    spyOn(component, 'descargarPlantilla');
    spyOn(component, 'registrarPlantilla');

    component.generarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método descargarPlantilla', () => {
    spyOn(component, 'asignarValoresPlantilla');
    component.plantillaCONCAR = [
      {
        Sub_Diario: '11',
        Número_de_Documento: '45454',
        Número_de_Comprobante: '4545',
        Fecha_de_Comprobante: '2022-01-01',
        Código_de_Moneda: 'MN',
        Glosa_Principal: 'test',
        Glosa_Detalle: 'test',
        Tipo_de_Cambio: '10',
        Tipo_de_Conversión: 'S',
        Flag_de_Conversión_de_Moneda: '',
        Fecha_Tipo_de_Cambio: '2022-01-01',
        Cuenta_Contable: '421001',
        Código_de_Anexo: '44',
        Código_de_Centro_de_Costo: '',
        Código_de_Anexo_Auxiliar: '',
        Código_de_Area: '',
        Debe_____Haber: 'd',
        Importe_Base_Detracción_____Percepción_Dólares: '0',
        Importe_Base_Detracción_____Percepción_Soles: '0',
        Importe_Original: '0',
        Importe_de_IGV_sin_derecho_crédito_fiscal: '0',
        Importe_en_Dólares: '0',
        Importe_en_Soles: '0',
        Tipo_Cambio_para_____F___: '',
        Tipo_de_Documento: '',
        Tipo_de_Documento_de_Referencia: '',
        Tipo_de_Tasa: '',
        Tipo_Referencia_en_estado_MQ: '',
        Fecha_de_Documento: '',
        Fecha_de_Operación: '',
        Fecha_de_Vencimiento: '',
        Fecha_Documento_Referencia: '',
        Medio_de_Pago: '',
        Número_de_Documento_Referencia: '',
        Nro_Máq__Registradora_Tipo_Doc__Ref_: '',
        Número_Serie_Caja_Registradora: '',
        Base_Imponible_Documento_Referencia: '',
        IGV_Documento_Provisión: '',
        Tasa_Detracción_____Percepción: '',
      },
    ];

    component.descargarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método registrarPlantilla con form invalid', () => {
    component.form.value.idPlantillaComprobante = '';
    component.form.value.nroTicketEnvio = '';
    component.form.value.fechaCarga = '';
    component.form.value.fechaDeclaracion = '';
    component.form.value.observacion = '';
    component.form.value.estado = '';
    component.form.value.fechaCreacion = '';
    component.form.value.usuarioCreacion = '';

    component.registrarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método registrarPlantilla con modificar true', () => {
    component.modificar = true;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = '2022-01-01';
    component.form.value.fechaDeclaracion = '2022-01-01';
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'actualizarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.registrarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método registrarPlantilla con modificar true y id=1', () => {
    component.modificar = true;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = '2022-01-01';
    component.form.value.fechaDeclaracion = '2022-01-01';
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 1,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'actualizarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.registrarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método registrarPlantilla con modificar false', () => {
    component.modificar = false;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = '2022-01-01';
    component.form.value.fechaDeclaracion = '2022-01-01';
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'actualizarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));
    spyOn(component, 'registrarDetalle');
    spyOn(component, 'actualizarCorrelativo');

    component.registrarPlantilla();

    expect(component).toBeTruthy();
  });

  it('Llama al método registrarDetalle', () => {
    component.detallePlantillaRegistro = [
      {
        idPlantillaComprobante: '00001',
        idComprobante: '0001',
        subDiario: '11',
        numeroComprobante: '0001',
        fechaComprobante: '2022-01-01',
        glosaPrincipal: '',
        glosaDetalle: '',
        tipoConvergencia: 'S',
        idCuentaContable: '',
        codigoAnexo: '',
        idCentroCosto: '',
        debeHaber: 'H',
        importeOriginal: 100,
        detalle: '',
        estado: 'A',
      },
    ];
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _DetallePlantillaComprobanteService,
      'agregarDetallePlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.registrarDetalle('00001');

    expect(component).toBeTruthy();
  });

  it('Llama al método actualizarCorrelativo con nuevoCorrelativo true', () => {
    component.nuevoCorrelativo = true;
    component.form.value.fechaCarga = '2022-01-01';
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _CorrelativoPlantillaComprobanteService,
      'agregarCorrelativoPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.actualizarCorrelativo();

    expect(component).toBeTruthy();
  });

  it('Llama al método actualizarCorrelativo con nuevoCorrelativo false', () => {
    component.nuevoCorrelativo = false;
    component.form.value.fechaCarga = '2022-01-01';
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _CorrelativoPlantillaComprobanteService,
      'agregarCorrelativoPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.actualizarCorrelativo();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarPlantillaComprobante con modificar true id =0', () => {
    component.nuevoCorrelativo = true;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = new Date();
    component.form.value.fechaDeclaracion = new Date();
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'actualizarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.agregarPlantillaComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarPlantillaComprobante con modificar true id =1', () => {
    component.nuevoCorrelativo = true;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = new Date();
    component.form.value.fechaDeclaracion = new Date();
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 1,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'actualizarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.agregarPlantillaComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarPlantillaComprobante con modificar false y id =0', () => {
    component.nuevoCorrelativo = false;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = new Date();
    component.form.value.fechaDeclaracion = new Date();
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 0,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'agregarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.agregarPlantillaComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarPlantillaComprobante con modificar false y id =1', () => {
    component.nuevoCorrelativo = false;
    component.form.value.idPlantillaComprobante = '00000001';
    component.form.value.nroTicketEnvio = '1345';
    component.form.value.fechaCarga = new Date();
    component.form.value.fechaDeclaracion = new Date();
    component.form.value.observacion = 'test';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';
    _respuesta = {
      id: 1,
      message: 'ok',
      detail: '',
    };

    spyOn(
      _PlantillaComprobanteService,
      'agregarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.agregarPlantillaComprobante();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });

  it('Llama al método selectRow', () => {
    component.listaDetallePlantillaComprobante = [
      {
        select: '1',
        idComprobante: '000001',
        asiTipoDocumento: 3,
        abrMoneda: 'MN',
        razonSocial: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        serie: 'XXX',
        correlativo: '111',
        fechaEmision: '2022-01-01',
        nroDocumento: '1231321321',
        abrTipoDocumento: 'FT',
        valorCompra: 100.0,
        igv: 18.0,
        importeTotal: 118.0,
        fechaVencimiento: '',
      },
      {
        select: '1',
        idComprobante: '000001',
        asiTipoDocumento: 3,
        abrMoneda: 'MN',
        razonSocial: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        serie: 'XXX',
        correlativo: '222',
        fechaEmision: '2022-01-01',
        nroDocumento: '1231321321',
        abrTipoDocumento: 'FT',
        valorCompra: 100.0,
        igv: 18.0,
        importeTotal: 118.0,
        fechaVencimiento: '',
      },
    ];
    component.selectRow('XXX', '111');

    expect(component).toBeTruthy();
  });
});
