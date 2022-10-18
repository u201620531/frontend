import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrelativoPlantillaComprobante } from 'src/app/interfaces/correlativo-plantilla-comprobante';
import { CuentaContable } from 'src/app/interfaces/cuenta-contable';
import { DetallePlantillaComprobante } from 'src/app/interfaces/detalle-plantilla-comprobante';
import { PlantillaComprobante } from 'src/app/interfaces/plantilla-comprobante';
import { PlantillaCONCAR } from 'src/app/interfaces/plantilla-concar';
import { SubCuentaContable } from 'src/app/interfaces/sub-cuenta-contable';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { CorrelativocorrelativoPlantillaComprobanteService } from 'src/app/services/correlativo-plantilla-comprobante.service';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { DetallePlantillaComprobanteService } from 'src/app/services/detalle-plantilla-comprobante.service';
import { PlantillaComprobanteService } from 'src/app/services/plantilla-comprobante.service';
import { SubCuentaContableService } from 'src/app/services/sub-cuenta-contable.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  accion_mensaje,
  auditoriaLog,
  estado_inicial,
  filters,
  plantilla_CONCAR,
} from 'src/shared/config';
import {
  formatoFechaGuion,
  formatoFechaGuionCadena,
} from 'src/shared/functions';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-plantilla-comprobante',
  templateUrl: './plantilla-comprobante.component.html',
  styleUrls: ['./plantilla-comprobante.component.css'],
})
export class PlantillaComprobanteComponent implements OnInit {
  form: FormGroup;
  listaDetallePlantillaComprobante: any;
  listaSubCuentasContables: SubCuentaContable[] = [];
  listaCuentasContables: CuentaContable[] = [];
  correlativo: CorrelativoPlantillaComprobante;
  displayedColumns: string[] = [
    'select',
    'idPlantillaComprobante',
    'serie',
    'correlativo',
    'nroDocumento',
    'razonSocial',
    'fechaEmision',
    'formaPago',
    'tipoDocumento',
    'importeTotal',
    'estado',
  ];
  dataSource!: MatTableDataSource<DetallePlantillaComprobante>;
  placeholderValue: string = '';
  idPlantillaComprobante: string = '';
  plantillaCONCAR: PlantillaCONCAR[] = [];
  private paginator!: MatPaginator;
  private sort: MatSort;
  modificar: boolean = false;
  eliminar: boolean = true;
  loading: boolean = true;
  readonlyOption: boolean = true;
  readonlyFCarga: boolean = false;
  plantillaRegistro: PlantillaComprobante = {
    idPlantillaComprobante: '',
    nroTicketEnvio: '',
    fechaCarga: '',
    fechaDeclaracion: '',
    observacion: '',
    fechaCreacion: '',
    estado: '',
    usuarioCreacion: '',
  };
  detallePlantillaRegistro: DetallePlantillaComprobante[] = [];
  validaRegistro: boolean = false;
  nroTicketEnvio: string = '';
  fechaCarga: string = '';
  fechaDeclaracion: string = '';
  onseervaciones: string = '';
  auditoria: any = {};
  numCorrelativo: number = 0;
  nuevoCorrelativo = false;
  subDiario: string = '11';
  flagConversionMoneda: string = 'S';
  mesCarga: string = '';

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
    private _snackBar: MatSnackBar,
    private _plantillaComprobanteService: PlantillaComprobanteService,
    private _detallePlantillaComprobanteService: DetallePlantillaComprobanteService,
    private _usuarioService: UsuarioService,
    private _cuentaContableService: CuentaContableService,
    private _subCuentaContableService: SubCuentaContableService,
    private _auditoriaService: AuditoriaService,
    private _correlativocorrelativoPlantillaComprobanteService: CorrelativocorrelativoPlantillaComprobanteService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({
      idPlantillaComprobante: [''],
      nroTicketEnvio: [''],
      fechaCarga: ['', Validators.required],
      fechaDeclaracion: [''],
      observacion: [''],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  selection = new SelectionModel<DetallePlantillaComprobante>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngOnInit(): void {
    this.listarCuentasContables();
    this.listarSubCuentasContables();
    this.placeholderValue = filters.placeholders.plantilla;
    this.listarPlantilla();
    this.listarDetallePlantilla();
  }

  async listarSubCuentasContables() {
    this._subCuentaContableService.listarSubCuentasContables().subscribe(
      (res) => {
        this.listaSubCuentasContables = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
          proceso: auditoriaLog.procesos.listar + ' subcuentas',
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

  async listarCuentasContables() {
    this._cuentaContableService.listarCuentasContables().subscribe(
      (res) => {
        this.listaCuentasContables = res;
      },
      (err) => {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
          proceso: auditoriaLog.procesos.listar + ' cuentas',
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

  listarPlantilla(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idPlantillaComprobante']) {
        this.idPlantillaComprobante = params['idPlantillaComprobante'];
        this._plantillaComprobanteService
          .listarPlantillaComprobantePorId(this.idPlantillaComprobante)
          .subscribe(
            (res: any) => {
              this.form.setValue({
                idPlantillaComprobante: res.idPlantillaComprobante,
                nroTicketEnvio: res.nroTicketEnvio,
                fechaCarga: res.fechaCarga,
                fechaDeclaracion: res.fechaDeclaracion,
                observacion: res.observacion,
                estado: res.estado,
                fechaCreacion: res.fechaCreacion,
                usuarioCreacion: res.usuarioCreacion,
              });
              this.modificar = this.idPlantillaComprobante !== '0';
            },
            (err: any) => {
              this.auditoria = {
                fecha: new Date(),
                opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
                proceso: auditoriaLog.procesos.listar + ' plantilla',
                codigoError: err.id,
                mensageError: err.message,
                detalleError: err.detail,
                codigoUsuario:
                  this._usuarioService.currentUsuarioValue.codigoUsuario,
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
    });
  }

  listarDetallePlantilla() {
    this._route.queryParams.subscribe((params) => {
      if (params && params['modificar']) {
        this.readonlyOption = params['modificar'] !== '1' ? true : false;
        this.readonlyFCarga = true;
        this.eliminar = params['modificar'] !== '1' ? true : false;
      } else this.readonlyOption = false;
      if (params && params['idPlantillaComprobante'])
        this.idPlantillaComprobante = params['idPlantillaComprobante'];
      else this.idPlantillaComprobante = '0';
      this._detallePlantillaComprobanteService
        .listarDetallePlantillaComprobante(this.idPlantillaComprobante)
        .subscribe(
          (res: any) => {
            this.listaDetallePlantillaComprobante = res;
            this.dataSource =
              new MatTableDataSource<DetallePlantillaComprobante>();
            this.dataSource.data = res;
            this.loading = false;
          },
          (err: any) => {
            this.readonlyOption = true;
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso: auditoriaLog.procesos.listar + ' detalle',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
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
    });
  }

  async listarCorrelativo() {
    let dateCarga = new Date(this.form.value.fechaCarga);
    dateCarga.setDate(dateCarga.getDate());
    this.fechaCarga = formatoFechaGuion(dateCarga);
    const ano = dateCarga.getFullYear();
    const mes = dateCarga.getMonth()+1;
    this.mesCarga = (mes).toString().padStart(2, '0');
    this._correlativocorrelativoPlantillaComprobanteService
      .listarCorrelativoPlantillaComprobantePorAnoyMes(ano, mes)
      .subscribe(
        (res: any) => {
          this.correlativo = res;
          if (res.correlativo !== undefined) {
            this.numCorrelativo = res.correlativo;
            this.nuevoCorrelativo = false;
          } else {
            this.numCorrelativo = 0;
            this.nuevoCorrelativo = true;
          }
        },
        (err: any) => {
          this.auditoria = {
            fecha: new Date(),
            opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
            proceso: auditoriaLog.procesos.listar + ' detalle',
            codigoError: err.id,
            mensageError: err.message,
            detalleError: err.detail,
            codigoUsuario:
              this._usuarioService.currentUsuarioValue.codigoUsuario,
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

  async asignarCorrelativo() {
    this.listarCorrelativo();
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarPlantillaComprobante(idPlantillaComprobante: string) {
    this._plantillaComprobanteService
      .eliminarPlantillaComprobante(idPlantillaComprobante)
      .subscribe(
        (res) => {
          const result: any = res;
          this._snackBar.open(
            result.message,
            accion_mensaje.registro_correcto,
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            }
          );
          if (result.id === 1) this.back();
        },
        (err) => {
          this.auditoria = {
            fecha: new Date(),
            opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
            proceso: auditoriaLog.procesos.eliminar + ' plnatilla',
            codigoError: err.id,
            mensageError: err.message,
            detalleError: err.detail,
            codigoUsuario:
              this._usuarioService.currentUsuarioValue.codigoUsuario,
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

  eliminarDetallePlantillaComprobante(
    idPlantillaComprobante: string,
    idComprobante: string
  ) {
    this._detallePlantillaComprobanteService
      .eliminarDetallePlantillaComprobante(
        idPlantillaComprobante,
        idComprobante
      )
      .subscribe(
        (res) => {
          const result: any = res;
          this._snackBar.open(
            result.message,
            accion_mensaje.registro_correcto,
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            }
          );
          if (result.id === 1) this.listarDetallePlantilla();
        },
        (err) => {
          this.auditoria = {
            fecha: new Date(),
            opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
            proceso: auditoriaLog.procesos.eliminar + ' detalle',
            codigoError: err.id,
            mensageError: err.message,
            detalleError: err.detail,
            codigoUsuario:
              this._usuarioService.currentUsuarioValue.codigoUsuario,
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

  asignarValoresPlantilla() {
    this.plantillaCONCAR = [];
    let plantilla: any;
    let glosaPrincipal = '';
    let glosaDetalle = '';
    let tipoConversion = 'V';
    let mismoAnoCarga = true;
    let mismoMesCarga = true;
    this.validaRegistro = false;
    let detalleRegistro: DetallePlantillaComprobante = {
      idComprobante: '',
      idPlantillaComprobante: '',
      subDiario: '',
      numeroComprobante: '',
      fechaComprobante: '',
      glosaPrincipal: '',
      glosaDetalle: '',
      tipoConvergencia: '',
      idCuentaContable: '',
      codigoAnexo: '',
      idCentroCosto: '',
      debeHaber: '',
      importeOriginal: 0,
      detalle: '',
      estado: '',
    };
    this.listaDetallePlantillaComprobante.forEach((_comprobante: any) => {
      if (_comprobante.select === '1') {
        for (let i = 0; i < _comprobante.asiTipoDocumento; i++) {
          detalleRegistro = {
            idComprobante: '',
            idPlantillaComprobante: '',
            subDiario: '',
            numeroComprobante: '',
            fechaComprobante: '',
            glosaPrincipal: '',
            glosaDetalle: '',
            tipoConvergencia: '',
            idCuentaContable: '',
            codigoAnexo: '',
            idCentroCosto: '',
            debeHaber: '',
            importeOriginal: 0,
            detalle: '',
            estado: '',
          };
          plantilla = {};
          this.numCorrelativo += 1;
          plantilla.Sub_Diario = this.subDiario;
          plantilla.Número_de_Comprobante =
            this.mesCarga + this.numCorrelativo.toString().padStart(4, '0');
          plantilla.Fecha_de_Comprobante = new Date(
            this.fechaCarga
          ).toLocaleDateString();
          plantilla.Código_de_Moneda = _comprobante.abrMoneda;
          glosaPrincipal =
            (_comprobante.razonSocial.length > 25
              ? _comprobante.razonSocial.substring(0, 24)
              : _comprobante.razonSocial) +
            ' ' +
            _comprobante.serie +
            '-' +
            _comprobante.correlativo;
          plantilla.Glosa_Principal = glosaPrincipal;
          plantilla.Tipo_de_Cambio = '0';
          mismoAnoCarga =
            this.fechaCarga.substring(0, 4) ===
            _comprobante.fechaEmision.substring(0, 4);
          mismoMesCarga = mismoAnoCarga
            ? this.fechaCarga.substring(5, 7) ===
              _comprobante.fechaEmision.substring(5, 7)
            : false;
          tipoConversion =
            !mismoMesCarga && _comprobante.abrMoneda === 'ME' ? 'E' : 'V';
          plantilla.Tipo_de_Conversión = tipoConversion;
          plantilla.Flag_de_Conversión_de_Moneda = this.flagConversionMoneda;
          plantilla.Fecha_Tipo_de_Cambio = '';
          if (i === 0) {
            plantilla.Cuenta_Contable =
              _comprobante.abrMoneda === 'MN'
                ? this.listaCuentasContables.filter((_cuenta) =>
                    _cuenta.idCuentaContable.toString().match('421201')
                  )[0].idCuentaContable
                : this.listaCuentasContables.filter((_cuenta) =>
                    _cuenta.idCuentaContable.toString().match('421202')
                  )[0].idCuentaContable;
            plantilla.Código_de_Anexo = _comprobante.nroDocumento;
            plantilla.Código_de_Centro_de_Costo = '';
            plantilla.Debe_____Haber =
              _comprobante.abrTipoDocumento === 'NC' ? 'H' : 'D';
            plantilla.Importe_Original = _comprobante.valorCompra;
          }
          if (i === 1 && _comprobante.asiTipoDocumento === 3) {
            plantilla.Cuenta_Contable = this.listaCuentasContables.filter(
              (_cuenta) => _cuenta.idCuentaContable.toString().match('401111')
            )[0].idCuentaContable;
            plantilla.Código_de_Anexo = _comprobante.nroDocumento;
            plantilla.Código_de_Centro_de_Costo = '';
            plantilla.Debe_____Haber =
              _comprobante.abrTipoDocumento === 'NC' ? 'D' : 'H';
            plantilla.Importe_Original = _comprobante.igv;
          }
          if (i === 1 && _comprobante.asiTipoDocumento === 2) {
            plantilla.Cuenta_Contable = this.listaCuentasContables.filter(
              (_cuenta) => _cuenta.idCuentaContable.toString().match('639999')
            )[0].idCuentaContable;
            plantilla.Código_de_Anexo = '';
            plantilla.Código_de_Centro_de_Costo =
              this.listaCuentasContables.filter((_cuenta) =>
                _cuenta.idCuentaContable.toString().match('639999')
              )[0].idCuentaContable;
            plantilla.Debe_____Haber =
              _comprobante.abrTipoDocumento === 'NC' ? 'D' : 'H';
            plantilla.Importe_Original = _comprobante.importeTotal;
          }
          if (i === 2) {
            plantilla.Cuenta_Contable = this.listaCuentasContables.filter(
              (_cuenta) => _cuenta.idCuentaContable.toString().match('639999')
            )[0].idCuentaContable;
            plantilla.Código_de_Anexo = '';
            plantilla.Código_de_Centro_de_Costo =
              this.listaCuentasContables.filter((_cuenta) =>
                _cuenta.idCuentaContable.toString().match('639999')
              )[0].idCuentaContable;
            plantilla.Debe_____Haber =
              _comprobante.abrTipoDocumento === 'NC' ? 'H' : 'D';
            plantilla.Importe_Original = _comprobante.importeTotal;
          }

          plantilla.Importe_en_Dólares = '';
          plantilla.Importe_en_Soles = 0.0;
          plantilla.Tipo_de_Documento = _comprobante.abrTipoDocumento;
          plantilla.Número_de_Documento =
            _comprobante.serie + '-' + _comprobante.correlativo;
          plantilla.Fecha_de_Documento = new Date(
            _comprobante.fechaEmision
          ).toLocaleDateString();
          plantilla.Fecha_de_Vencimiento =
            _comprobante.fechaVencimiento !== '' &&
            _comprobante.fechaVencimiento !== null &&
            _comprobante.fechaVencimiento !== undefined
              ? new Date(_comprobante.fechaVencimiento).toLocaleDateString()
              : '';
          plantilla.Código_de_Area = '';
          glosaDetalle =
            (_comprobante.razonSocial.length > 15
              ? _comprobante.razonSocial.substring(0, 14)
              : _comprobante.razonSocial) +
            ' ' +
            _comprobante.serie +
            '-' +
            _comprobante.correlativo;
          plantilla.Glosa_Detalle = glosaDetalle;
          plantilla.Código_de_Anexo_Auxiliar = '';
          plantilla.Medio_de_Pago = '';
          plantilla.Tipo_de_Documento_de_Referencia = '';
          plantilla.Número_de_Documento_Referencia = '';
          plantilla.Fecha_Documento_Referencia = '';
          plantilla.Nro_Máq__Registradora_Tipo_Doc__Ref_ = '';
          plantilla.Base_Imponible_Documento_Referencia = '';
          plantilla.IGV_Documento_Provisión = '';
          plantilla.Tipo_Referencia_en_estado_MQ = '';
          plantilla.Número_Serie_Caja_Registradora = '';
          plantilla.Fecha_de_Operación = '';
          plantilla.Tipo_de_Tasa = '';
          plantilla.Tasa_Detracción_____Percepción = '';
          plantilla.Importe_Base_Detracción_____Percepción_Dólares = '';
          plantilla.Importe_Base_Detracción_____Percepción_Soles = '';
          plantilla.Tipo_Cambio_para_____F___ = '';
          plantilla.Importe_de_IGV_sin_derecho_crédito_fiscal = '';

          this.plantillaCONCAR.push(plantilla);

          //Detalle
          detalleRegistro.idComprobante = _comprobante.idComprobante;
          detalleRegistro.estado = estado_inicial;
          detalleRegistro.subDiario = this.subDiario;
          detalleRegistro.numeroComprobante = plantilla.Número_de_Comprobante;
          detalleRegistro.fechaComprobante = this.fechaCarga;
          detalleRegistro.glosaPrincipal = glosaPrincipal;
          detalleRegistro.glosaDetalle = glosaDetalle;
          detalleRegistro.tipoConvergencia = tipoConversion;
          detalleRegistro.idCuentaContable = plantilla.Cuenta_Contable;
          detalleRegistro.codigoAnexo = plantilla.Código_de_Anexo;
          detalleRegistro.idCentroCosto = plantilla.Código_de_Centro_de_Costo;
          detalleRegistro.debeHaber = plantilla.Debe_____Haber;
          detalleRegistro.importeOriginal = plantilla.Importe_Original;
          this.detallePlantillaRegistro.push(detalleRegistro);
          this.validaRegistro = true;
        }
      }
    });
  }

  async generarPlantilla() {
    if (this.form.value.fechaCarga === ''){
      this._snackBar.open(
        accion_mensaje.faltan_datos,'Seleccione Fecha de carga',
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
      return false;
    }   
     this.descargarPlantilla();
    if (this.validaRegistro) this.registrarPlantilla();
    return true;
  }

  async descargarPlantilla() {
    this.asignarValoresPlantilla();
    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(wb, plantilla_CONCAR.campos);

    const ws = XLSX.utils.sheet_add_json(wb, this.plantillaCONCAR, {
      origin: 'A2',
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, 'compr');
    XLSX.writeFile(wb, plantilla_CONCAR.nombre_archivo + '.xlsx');
  }

  async registrarPlantilla() {
    if (!this.form.valid) {
      this._snackBar.open(
        accion_mensaje.faltan_datos,
        accion_mensaje.agregar_valor_ingresado_seleccionado,
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
      return false;
    }

    //Asignar valores cabecera
    this.plantillaRegistro.idPlantillaComprobante = '';
    this.plantillaRegistro.nroTicketEnvio = '';
    this.plantillaRegistro.fechaDeclaracion = '';
    this.plantillaRegistro.fechaCarga = formatoFechaGuion(
      this.form.value.fechaCarga
    );
    this.plantillaRegistro.observacion = this.form.value.observacion;
    this.plantillaRegistro.estado = this.modificar
      ? this.form.value.estado
      : estado_inicial;
    this.plantillaRegistro.fechaCreacion = this.modificar
      ? this.form.value.fechaCreacion
      : formatoFechaGuion(new Date());
    this.plantillaRegistro.usuarioCreacion = this.modificar
      ? this.form.value.usuarioCreacion
      : this._usuarioService.currentUsuarioValue.codigoUsuario;
    if (this.modificar) {
      this._plantillaComprobanteService
        .actualizarPlantillaComprobante(
          this.plantillaRegistro,
          this.plantillaRegistro.idPlantillaComprobante
        )
        .subscribe(
          (res) => {
            const result: any = res;
            if (result.id === 1) this.back();
            this._snackBar.open(
              result.message,
              accion_mensaje.registro_correcto,
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000,
              }
            );
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso: auditoriaLog.procesos.actualiar + ' plantilla',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
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
    } else {
      this._plantillaComprobanteService
        .agregarPlantillaComprobante(this.plantillaRegistro)
        .subscribe(
          (res) => {
            const result: any = res;
            this.idPlantillaComprobante = result.detail;
            this.registrarDetalle(this.idPlantillaComprobante);
            this.actualizarCorrelativo();
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso: auditoriaLog.procesos.guardar + ' plantilla',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
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
    return true;
  }

  registrarDetalle(idPlantilla: string) {
    let error_detalle = '';
    this.detallePlantillaRegistro.forEach((element) => {
      element.idPlantillaComprobante = idPlantilla;
      this._detallePlantillaComprobanteService
        .agregarDetallePlantillaComprobante(element)
        .subscribe(
          (res) => {
            const result: any = res;
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso:
                auditoriaLog.procesos.guardar +
                ' detalle ' +
                element.idComprobante,
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
            };
            this._auditoriaService
              .agregarAuditoria(this.auditoria)
              .subscribe((res) => {});

            error_detalle = err.message;
          }
        );
    });
    if (error_detalle === '') {
      this._snackBar.open('Registro Ok', accion_mensaje.registro_correcto, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
      this.back();
    } else {
      this._snackBar.open(error_detalle, accion_mensaje.error_tecnico, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }
  }

  actualizarCorrelativo() {
    let dateCarga = new Date(this.form.value.fechaCarga);
    dateCarga.setDate(dateCarga.getDate());
    const ano = dateCarga.getFullYear();
    const mes = dateCarga.getMonth() +1;
    const correlativoPlantillaComprobante = {
      correlativo: this.numCorrelativo,
      ano: ano,
      mes: mes,
    };
    if (this.nuevoCorrelativo) {
      this._correlativocorrelativoPlantillaComprobanteService
        .agregarCorrelativoPlantillaComprobante(correlativoPlantillaComprobante)
        .subscribe(
          (res) => {
            const result: any = res;
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso: auditoriaLog.procesos.guardar + ' correlativo plantilla',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
            };
            this._auditoriaService
              .agregarAuditoria(this.auditoria)
              .subscribe((res) => {});
          }
        );
    } else {
      this._correlativocorrelativoPlantillaComprobanteService
        .actualizarCorrelativoPlantillaComprobante(
          correlativoPlantillaComprobante,
          ano,
          mes
        )
        .subscribe(
          (res) => {
            const result: any = res;
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso:
                auditoriaLog.procesos.actualiar + ' correlativo plantilla',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
            };
            this._auditoriaService
              .agregarAuditoria(this.auditoria)
              .subscribe((res) => {});
          }
        );
    }
  }

  agregarPlantillaComprobante() {
    const plantillaComprobante: PlantillaComprobante = {
      idPlantillaComprobante: this.modificar
        ? this.form.value.idPlantillaComprobante
        : '',
      nroTicketEnvio: this.form.value.nroTicketEnvio,
      fechaCarga: formatoFechaGuion(this.form.value.fechaCarga),
      fechaDeclaracion: formatoFechaGuion(this.form.value.fechaDeclaracion),
      observacion: this.form.value.observacion,
      estado: this.modificar ? this.form.value.estado : estado_inicial,
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : formatoFechaGuion(new Date()),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this._plantillaComprobanteService
        .actualizarPlantillaComprobante(
          plantillaComprobante,
          plantillaComprobante.idPlantillaComprobante
        )
        .subscribe(
          (res) => {
            const result: any = res;
            if (result.id === 1) this.back();
            this._snackBar.open(
              result.message,
              accion_mensaje.registro_correcto,
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000,
              }
            );
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso: auditoriaLog.procesos.actualiar + ' plantilla',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
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
    } else {
      this._plantillaComprobanteService
        .agregarPlantillaComprobante(plantillaComprobante)
        .subscribe(
          (res) => {
            const result: any = res;
            this._snackBar.open(
              result.message,
              accion_mensaje.registro_correcto,
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000,
              }
            );
            if (result.id === 1) this.back();
          },
          (err) => {
            this.auditoria = {
              fecha: new Date(),
              opcion: auditoriaLog.opciones.comprobante_plantilla_agregar,
              proceso: auditoriaLog.procesos.guardar + ' plantilla',
              codigoError: err.id,
              mensageError: err.message,
              detalleError: err.detail,
              codigoUsuario:
                this._usuarioService.currentUsuarioValue.codigoUsuario,
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
  }

  back() {
    this._router.navigate(['/dashboard/plantilla-comprobante']);
  }

  selectRow(serie: string, correlativo: string) {
    this.listaDetallePlantillaComprobante.map((_comprobante: any) => {
      if (
        _comprobante.serie === serie &&
        _comprobante.correlativo === correlativo
      )
        _comprobante.select = _comprobante.select === '1' ? '' : '1';
    });
  }
}
