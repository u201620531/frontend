import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Comprobante } from 'src/app/interfaces/comprobante';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { Moneda } from 'src/app/interfaces/moneda';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { TipoCambio } from 'src/app/interfaces/tipo-cambio';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  accion_mensaje,
  auditoriaLog,
  estado_inicial,
  filters,
  validaciones_comprobantes,
} from 'src/shared/config';
import {
  formatoFechaGuion,
  formatoFechaGuionCadena,
} from 'src/shared/functions';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-comprobante',
  templateUrl: './cargar-comprobante.component.html',
  styleUrls: ['./cargar-comprobante.component.css'],
})
export class CargarComprobanteComponent implements OnInit {
  listaComprobantesEscaneados: Comprobante[] = [];
  listaComprobantesPorCargar: any[] = [];
  listaComprobantes: Comprobante[] = [];
  listaProveedores: Proveedor[] = [];
  listaTiposDocumento: TipoDocumento[] = [];
  listaFormasPago: FormaPago[] = [];
  listaMonedas: Moneda[] = [];
  listaTipoCambio: TipoCambio[] = [];
  listadoColumnas: string[] = [
    'item',
    'nroDocumento',
    'ruc',
    'razonSocial',
    'detalle',
  ];
  dataSource!: MatTableDataSource<any[]>;
  comprobanteEscaneado: any = [];
  comprobante: Comprobante;
  fileExcel?: File;
  excelData: any;
  habilitarRegistro: boolean = false;
  totalComprobantes: number = 0;

  private paginator!: MatPaginator;
  private sort: MatSort;
  loading: boolean = false;
  existeFechaEmision: boolean = false;
  auditoria: any = {};

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    if (ms !== undefined) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp !== undefined) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _proveedorService: ProveedorService,
    private _tipoDocumentoService: TipoDocumentoService,
    private _monedaService: MonedaService,
    private _formaPagoService: FormaPagoService,
    private _usuarioService: UsuarioService,
    private _comprobanteService: ComprobanteService,
    private _tipoCambioService: TipoCambioService,
    private _auditoriaService: AuditoriaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarListados();
  }

  inicializarListados() {
    this.cantidadComprobantes();
    this.listarProveedores();
    this.listarTiposDocumento();
    this.listarFormasPago();
    this.listarMonedas();
    this.listarTipoCambio();
  }

  cantidadComprobantes() {
    this._comprobanteService.listarComprobante().subscribe(
      (res) => {
        this.totalComprobantes = res.length;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_cargar,
          proceso: auditoriaLog.procesos.listar + ' comprobantes',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    );
  }

  listarProveedores() {
    this._proveedorService.listarPoveedores().subscribe(
      (res) => {
        this.listaProveedores = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_cargar,
          proceso: auditoriaLog.procesos.listar + ' proveedores',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    );
  }

  listarTiposDocumento() {
    this._tipoDocumentoService.listarTipoDocumento().subscribe(
      (res) => {
        this.listaTiposDocumento = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_cargar,
          proceso: auditoriaLog.procesos.listar + ' tipos de documento',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    );
  }

  listarMonedas() {
    this._monedaService.listarMonedas().subscribe(
      (res) => {
        this.listaMonedas = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_cargar,
          proceso: auditoriaLog.procesos.listar + ' monedas',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    );
  }

  listarFormasPago() {
    this._formaPagoService.listarFormaPago().subscribe(
      (res) => {
        this.listaFormasPago = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_cargar,
          proceso: auditoriaLog.procesos.listar + ' formas de pago',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    );
  }

  listarTipoCambio() {
    this._tipoCambioService.listarTiposCambio().subscribe(
      (res) => {
        this.listaTipoCambio = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_cargar,
          proceso: auditoriaLog.procesos.listar + ' tipo de cambio',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    );
  }

  limpiarListaComprobantesPorCargar() {
    this.listaComprobantes = [];
    this.listaComprobantesPorCargar = [];
    this.dataSource = new MatTableDataSource(this.listaComprobantesPorCargar);
  }

  seleccionarComprobantes(event: any): void {
    this.loading = true;
    this.limpiarListaComprobantesPorCargar();
    this.fileExcel = event.target.files[0];
    let fileReader = new FileReader();
    const blob = new Blob([''], { type: 'text/html' });
    fileReader.readAsBinaryString(
      this.fileExcel === undefined ? blob : this.fileExcel
    );
    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, {
        type: 'binary',
        cellDates: true,
      });
      let sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

      if (this.listaComprobantesPorCargar.length === 0)
        this.habilitarRegistro = false;
      let numRegistro = 0;
      this.excelData.forEach((element: any) => {
        numRegistro += 1;
        this.comprobante = {
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
        const detalleValidacion = this.validarRegistro(element);
        this.comprobanteEscaneado = {
          item: numRegistro,
          razonSocial: element.RAZON_SOCIAL,
          idProveedor: element.RUC,
          nroDocumento: element.NRO_DOCUMENTO,
          ruc: element.RUC,
          fechaEmision: element.FECHA_EMISION,
          idMoneda: element.TIPO_MONEDA,
          importeTotal: element.IMPORTE_TOTAL,
          fechaVencimiento: element.FECHA_VENCIMIENTO,
          valorCompra: element.VALOR_COMPRA,
          igv: element.IGV,
          detalle: detalleValidacion,
          estado: detalleValidacion === '' ? 1 : 0,
        };
        this.listaComprobantesPorCargar.push(this.comprobanteEscaneado);
        this.asignarValoresComprobantes(
          this.comprobante,
          this.comprobanteEscaneado
        );
        this.listaComprobantes.push(this.comprobante);
      });
      this.cargarlistaComprobantesPorCargar();
    };
    this.loading = false;
  }

  cargarlistaComprobantesPorCargar() {
    this.dataSource = new MatTableDataSource(this.listaComprobantesPorCargar);
  }

  async registrarComprobantes() {
    let detalleError = '';
    this.listaComprobantes.forEach((_comprobante: Comprobante) => {
      this.totalComprobantes += 1;
      this._comprobanteService
        .agregarComprobanteMasivo(
          _comprobante,
          this.totalComprobantes.toString()
        )
        .subscribe(
          (res) => {
            this.habilitarRegistro = false;
          },
          (error) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_cargar,
              proceso:
                auditoriaLog.procesos.guardar +
                ' comprobante' +
                _comprobante.serie +
                '-' +
                _comprobante.correlativo,
              codigoError: error.id,
              mensageError: error.message,
              detalleError: error.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
            };
            this._auditoriaService
              .agregarAuditoria(this.auditoria)
              .subscribe((res) => {});
            detalleError += this.agregarSeparador(detalleError) + error.message;
          }
        );
    });

    if (detalleError === '') {
      this.limpiarListaComprobantesPorCargar();
      this._snackBar.open(
        'Comprobantes registrados',
        accion_mensaje.registro_correcto,
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
    } else {
      this._snackBar.open(detalleError, accion_mensaje.error_tecnico, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }
  }

  validarRegistro(comprobanteValidar: any) {
    let detalle = '';
    detalle = this.validarNroDoumento(
      comprobanteValidar.NRO_DOCUMENTO,
      detalle
    );
    detalle = this.validarProveedor(comprobanteValidar.RUC, detalle);
    detalle = this.validarTipoDocumento(
      comprobanteValidar.TIPO_DOCUMENTO,
      detalle
    );
    detalle = this.validarFormaPago(comprobanteValidar.FORMA_PAGO, detalle);
    detalle = this.validarMoneda(comprobanteValidar.TIPO_MONEDA, detalle);
    detalle = this.validarValorFecha(
      'Fecha emisión',
      comprobanteValidar.FECHA_EMISION,
      detalle,
      true
    );
    detalle = this.validarTipoCambio(comprobanteValidar.FECHA_EMISION, detalle);
    detalle = this.validarValorFecha(
      'Fecha vcmto',
      comprobanteValidar.FECHA_VENCIMIENTO,
      detalle,
      false
    );
    detalle = this.validarValorNumerico(
      'Total gravadas',
      comprobanteValidar.TOTAL_GRAVADAS,
      detalle
    );
    detalle = this.validarValorNumerico(
      'Total inafectas',
      comprobanteValidar.TOTAL_INAFECTAS,
      detalle
    );
    detalle = this.validarValorNumerico(
      'Total exoneradas',
      comprobanteValidar.TOTAL_EXONERADAS,
      detalle
    );
    detalle = this.validarValorNumerico(
      'Total exportacion',
      comprobanteValidar.TOTAL_EXPORTACION,
      detalle
    );
    detalle = this.validarValorNumerico(
      'Valor venta',
      comprobanteValidar.VALOR_COMPRA,
      detalle
    );
    detalle = this.validarValorNumerico('IGV', comprobanteValidar.IGV, detalle);
    detalle = this.validarValorNumerico('ISC', comprobanteValidar.ISC, detalle);
    detalle = this.validarValorNumerico(
      'Otros tributos',
      comprobanteValidar.OTROS_TRIBUTOS,
      detalle
    );
    detalle = this.validarValorNumerico(
      'Otros cargos',
      comprobanteValidar.OTROS_CARGOS,
      detalle
    );
    detalle = this.validarValorNumerico(
      'Dsctos globales',
      comprobanteValidar.DESCUENTOS_GLOBALES,
      detalle
    );
    this.habilitarRegistro = detalle === '' ? true : false;
    return detalle;
  }

  agregarSeparador(cadena: string) {
    if (cadena.length > 0) return (cadena = ',');
    return '';
  }

  validarNroDoumento(NRO_DOCUMENTO: string, detalle: string) {
    if (NRO_DOCUMENTO === '')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        'Nro documento ' +
        validaciones_comprobantes.nro_documento.vacia
      );

    const separadorDocumento = NRO_DOCUMENTO.indexOf('-');
    if (separadorDocumento > -1) {
      this.comprobante.serie = NRO_DOCUMENTO.substring(0, separadorDocumento);
      this.comprobante.correlativo = NRO_DOCUMENTO.substring(
        separadorDocumento + 1,
        NRO_DOCUMENTO.length
      );
    }

    return detalle;
  }

  validarProveedor(RUC: string, detalle: string) {
    if (RUC === '')
      return (
        this.agregarSeparador(detalle) +
        detalle +
        filters.placeholders.proveedor +
        ' ' +
        validaciones_comprobantes.proveedor.vacia
      );
    const registro = this.listaProveedores.filter((proveedor) =>
      proveedor.nroDocumento.toString().match(RUC.toString())
    )[0];
    if (registro === undefined)
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.proveedor +
        ' ' +
        validaciones_comprobantes.proveedor.no_existe
      );
    if (registro.estado !== 'A')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.proveedor +
        ' ' +
        validaciones_comprobantes.proveedor.inactivo
      );

    this.comprobante.idProveedor = registro.idProveedor;
    return detalle;
  }

  validarTipoDocumento(TIPO_DOCUMENTO: string, detalle: string) {
    if (TIPO_DOCUMENTO === '')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.tipoDocumento +
        ' ' +
        validaciones_comprobantes.tipo_documento.vacia
      );
    const registro = this.listaTiposDocumento.filter((tipo_documento) =>
      tipo_documento.descripcion
        .toString()
        .toUpperCase()
        .match(TIPO_DOCUMENTO.toUpperCase())
    )[0];
    if (registro === undefined)
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.tipoDocumento +
        ' ' +
        validaciones_comprobantes.tipo_documento.no_existe
      );
    if (registro.estado !== 'A')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.tipoDocumento +
        ' ' +
        validaciones_comprobantes.tipo_documento.inactivo
      );
    this.comprobante.idTipoDocumento = registro.idTipoDocumento;
    return detalle;
  }

  validarMoneda(TIPO_MONEDA: string, detalle: string) {
    if (TIPO_MONEDA === '')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.moneda +
        ' ' +
        validaciones_comprobantes.moneda.vacia
      );
    TIPO_MONEDA = TIPO_MONEDA.replace('SOLES', 'SOL');
    const registro = this.listaMonedas.filter((moneda) =>
      moneda.descripcion
        .toString()
        .toUpperCase()
        .match(TIPO_MONEDA.toUpperCase())
    )[0];
    if (registro === undefined)
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.moneda +
        ' ' +
        validaciones_comprobantes.moneda.no_existe
      );
    if (registro.estado !== 'A')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.moneda +
        ' ' +
        validaciones_comprobantes.moneda.inactivo
      );
    this.comprobante.idMoneda = registro.idMoneda;
    return detalle;
  }

  validarFormaPago(FORMA_PAGO: string, detalle: string) {
    if (FORMA_PAGO === '')
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.formaPago +
        ' ' +
        validaciones_comprobantes.forma_pago.vacia
      );
    const registro = this.listaFormasPago.filter((forma_pago) =>
      forma_pago.descripcion.toString().match(FORMA_PAGO)
    )[0];
    if (registro === undefined)
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.formaPago +
        ' ' +
        validaciones_comprobantes.forma_pago.no_existe
      );
    if (registro.estado !== 'A')
      return (
        this.agregarSeparador(detalle) +
        filters.placeholders.formaPago +
        ' ' +
        validaciones_comprobantes.forma_pago.inactivo
      );
    this.comprobante.idFormaPago = registro.idFormaPago;
    return detalle;
  }

  validarValorNumerico(valor: string, cadena: string, detalle: string) {
    if (cadena === '' || cadena === undefined) return detalle;
    if (isNaN(parseFloat(cadena)))
      return (
        detalle +
        this.agregarSeparador(detalle) +
        valor +
        ' ' +
        validaciones_comprobantes.valor_numerico.no_valida
      );
    return detalle;
  }

  validarValorFecha(
    valor: string,
    fecha: string,
    detalle: string,
    obligatorio: boolean
  ) {
    this.existeFechaEmision = false;
    if (!obligatorio && (fecha === '' || fecha === undefined)) return detalle;
    let RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    fecha = isNaN(parseInt(fecha))
      ? new Date(fecha).toLocaleDateString()
      : fecha;
    if (!fecha.toString().match(RegExPattern))
      return (
        detalle +
        this.agregarSeparador(detalle) +
        valor +
        ' ' +
        validaciones_comprobantes.fecha.formato_incorrecto
      );
    const fechaf = fecha.split('/');
    const day = fechaf[0];
    const month = fechaf[1];
    const year = fechaf[2];
    const date = new Date(parseInt(year), parseInt(month), 0);
    if (parseInt(day) - 0 > date.getDate() - 0) {
      return (
        detalle +
        this.agregarSeparador(detalle) +
        valor +
        ' ' +
        validaciones_comprobantes.fecha.no_valida
      );
    }
    if (
      !(
        parseInt(month) > 0 &&
        parseInt(month) < 13 &&
        parseInt(year) > 0 &&
        parseInt(year) < 32768 &&
        parseInt(day) > 0 &&
        parseInt(day) <= new Date(parseInt(year), parseInt(month), 0).getDate()
      )
    ) {
      return (
        detalle +
        this.agregarSeparador(detalle) +
        valor +
        ' ' +
        validaciones_comprobantes.fecha.no_valida
      );
    }
    this.existeFechaEmision = true;
    return detalle;
  }

  validarTipoCambio(FECHA_EMISION: any, detalle: string) {
    if (!this.existeFechaEmision)
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.tipoCambio +
        ' ' +
        validaciones_comprobantes.tipo_cambio.fecha_emision_no_valida
      );
    FECHA_EMISION = isNaN(parseInt(FECHA_EMISION))
      ? formatoFechaGuion(FECHA_EMISION)
      : formatoFechaGuionCadena(FECHA_EMISION);
    const registro = this.listaTipoCambio.filter((tipo_cambio) =>
      tipo_cambio.fecha.toString().match(FECHA_EMISION)
    )[0];
    if (registro === undefined)
      return (
        detalle +
        this.agregarSeparador(detalle) +
        filters.placeholders.tipoCambio +
        ' ' +
        validaciones_comprobantes.tipo_cambio.no_existe
      );
    if (registro.estado !== 'A')
      return (
        this.agregarSeparador(detalle) +
        filters.placeholders.tipoCambio +
        ' ' +
        validaciones_comprobantes.tipo_cambio.inactivo
      );
    this.comprobante.tipoCambio = registro.compra;
    return detalle;
  }

  asignarValoresComprobantes(
    comprobanteRegistro: Comprobante,
    comprobantesPorCargar: any
  ) {
    comprobanteRegistro.fechaEmision = isNaN(
      parseInt(comprobantesPorCargar.fechaEmision)
    )
      ? formatoFechaGuion(comprobantesPorCargar.fechaEmision)
      : formatoFechaGuionCadena(comprobantesPorCargar.fechaEmision);
    comprobanteRegistro.fechaVencimiento =
      comprobantesPorCargar.fechaVencimiento !== undefined &&
      isNaN(parseInt(comprobantesPorCargar.fechaVencimiento))
        ? formatoFechaGuion(comprobantesPorCargar.fechaVencimiento)
        : comprobantesPorCargar.fechaVencimiento == undefined
        ? ''
        : formatoFechaGuionCadena(comprobantesPorCargar.fechaVencimiento);
    comprobanteRegistro.importeTotal = comprobantesPorCargar.importeTotal;
    comprobanteRegistro.igv = comprobantesPorCargar.igv;
    comprobanteRegistro.valorCompra = comprobantesPorCargar.valorCompra;
    comprobanteRegistro.totalGravadas =
      comprobantesPorCargar.totalGravadas === ''
        ? 0
        : comprobanteRegistro.totalGravadas;
    comprobanteRegistro.totalInafectas =
      comprobantesPorCargar.totalInafectas === ''
        ? 0
        : comprobanteRegistro.totalInafectas;
    comprobanteRegistro.totalExoneradas =
      comprobantesPorCargar.totalExoneradas === ''
        ? 0
        : comprobanteRegistro.totalExoneradas;
    comprobanteRegistro.totalExportacion =
      comprobantesPorCargar.totalExportacion === ''
        ? 0
        : comprobanteRegistro.totalExportacion;
    comprobanteRegistro.valorCompra =
      comprobantesPorCargar.valorCompra === ''
        ? 0
        : comprobanteRegistro.valorCompra;
    comprobanteRegistro.igv =
      comprobantesPorCargar.igv === '' ? 0 : comprobanteRegistro.igv;
    comprobanteRegistro.isc =
      comprobantesPorCargar.isc === '' ? 0 : comprobanteRegistro.isc;
    comprobanteRegistro.otrosTributos =
      comprobantesPorCargar.otrosTributos === ''
        ? 0
        : comprobanteRegistro.otrosTributos;
    comprobanteRegistro.otrosCargos =
      comprobantesPorCargar.otrosCargos === ''
        ? 0
        : comprobanteRegistro.otrosCargos;
    comprobanteRegistro.descuentosGlobales =
      comprobantesPorCargar.descuentosGlobales === ''
        ? 0
        : comprobanteRegistro.descuentosGlobales;
    comprobanteRegistro.importeTotal =
      comprobantesPorCargar.importeTotal === ''
        ? 0
        : comprobanteRegistro.importeTotal;
    comprobanteRegistro.tipoCambio = comprobanteRegistro.tipoCambio;
    // comprobanteRegistro.serieGuia: string;
    // comprobanteRegistro.correlativoGuia: string;
    comprobanteRegistro.estado = estado_inicial;
    comprobanteRegistro.fechaCreacion = formatoFechaGuion(new Date());
    comprobanteRegistro.usuarioCreacion =
      this._usuarioService.currentUsuarioValue.codigoUsuario;
    return comprobanteRegistro;
  }
}
