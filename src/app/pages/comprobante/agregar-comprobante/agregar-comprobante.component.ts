import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comprobante } from 'src/app/interfaces/comprobante';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonedaService } from 'src/app/services/moneda.service';
import { Moneda } from 'src/app/interfaces/moneda';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje } from 'src/shared/config';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { map, startWith } from 'rxjs/operators';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import {
  formatoFechaGuion,
  formatoFechaGuionCadena,
} from 'src/shared/functions';

@Component({
  selector: 'app-agregar-comprobante',
  templateUrl: './agregar-comprobante.component.html',
  styleUrls: ['./agregar-comprobante.component.css'],
})
export class AgregarComprobanteComponent implements OnInit {
  form: FormGroup;
  listaComprobante: Comprobante[] = [];
  listaTipoDocumento: TipoDocumento[] = [];
  listaProveedores: Proveedor[] = [];
  listaMoneda: Moneda[] = [];
  listaFormaPago: FormaPago[] = [];
  IdComprobante: string = '';
  proveedor: Proveedor = {
    idProveedor: '',
    razonSocial: '',
    idTipoProveedor: '',
    idTipoDocumento: '',
    nroDocumento: '',
    email1: '',
    email2: '',
    estado: '',
    fechaCreacion: '',
  };
  IdProveedor: string = '';
  transactionTypeId: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;
  loading: boolean = true;

  filtroProveedores: Observable<Proveedor[]>;
  formProveedor: FormGroup;

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _monedaService: MonedaService,
    private _formaPagoService: FormaPagoService,
    private _comprobanteService: ComprobanteService,
    private _usuarioService: UsuarioService,
    private _proveedorService: ProveedorService,
    private _tipoCambioService: TipoCambioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this._formBuilder.group({
      idComprobante: [''],
      serie: ['', Validators.required],
      correlativo: ['', Validators.required],
      idTipoDocumento: ['', Validators.required],
      idFormaPago: ['', Validators.required],
      idProveedor: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fechaVencimiento: [''],
      totalGravadas: ['0.00'],
      totalInafectas: ['0.00'],
      totalExoneradas: ['0.00'],
      totalExportacion: ['0.00'],
      valorCompra: ['0.00', Validators.required],
      igv: ['0.00', Validators.required],
      isc: ['0.00'],
      otrosTributos: ['0.00'],
      otrosCargos: ['0.00'],
      descuentosGlobales: ['0.00'],
      importeTotal: ['0.00', Validators.required],
      tipoCambio: ['0.00'],
      idMoneda: ['', Validators.required],
      serieGuia: [''],
      correlativoGuia: [''],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  async ngOnInit() {
    this.listarProveedores();
    this.listarMoneda();
    this.listarFormaPago();
    this.listarTipoDocumento();
    this.initParams();
  }

  async listarProveedoresFiltro() {
    this.formProveedor = this.formBuilder.group({
      Proveedor: [],
    });
    this.filtroProveedores = this.formProveedor.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.razonSocial)),
      map((razonSocial) =>
        razonSocial ? this._filter(razonSocial) : this.listaProveedores.slice()
      )
    );
  }

  private _filter(value: string): Proveedor[] {
    const filterValue = value.toLowerCase();
    return this.listaProveedores.filter(
      (option) => option.razonSocial.toLowerCase().indexOf(filterValue) === 0
    );
  }

  async listarProveedor() {
    this._proveedorService
      .listarProveedorPoridProveedor(this.IdProveedor)
      .subscribe((res: any) => {
        this.proveedor = {
          idProveedor: res.idProveedor,
          idTipoProveedor: res.idTipoProveedor,
          idTipoDocumento: res.idTipoDocumento,
          nroDocumento: res.nroDocumento,
          razonSocial: res.razonSocial,
          nombreComercial: res.nombreComercial,
          direccion: res.direccion,
          direccionFiscal: res.direccionFiscal,
          email1: res.email1,
          email2: res.email2,
          estado: res.estado,
          fechaCreacion: res.fechaCreacion,
          usuarioCreacion: res.usuarioCreacion,
        };
        this.loading = false;
      });
  }

  displayFn(country: Proveedor): string {
    return country && country.razonSocial ? country.razonSocial : '';
  }

  async listarComprobante() {
    this._comprobanteService
      .listarComprobantePorId(this.IdComprobante)
      .subscribe((res: any) => {
        this.IdProveedor = res.idProveedor;
        let dateFEmision = new Date(res.fechaEmision);
        dateFEmision.setDate(dateFEmision.getDate() + 1);
        let dateFVencimiento;
        if (isNaN(res.fechaVencimiento)) {
          dateFVencimiento = new Date(res.fechaVencimiento);
          dateFVencimiento.setDate(dateFVencimiento.getDate() + 1);
        }
        this.form.setValue({
          idComprobante: res.idComprobante,
          serie: res.serie,
          correlativo: res.correlativo,
          idTipoDocumento: res.idTipoDocumento,
          idFormaPago: res.idFormaPago,
          idProveedor: res.idProveedor,
          fechaEmision: dateFEmision,
          fechaVencimiento: isNaN(res.fechaVencimiento)
            ? dateFVencimiento
            : res.fechaVencimiento,
          totalGravadas: res.totalGravadas.toFixed(2),
          totalInafectas: res.totalInafectas,
          totalExoneradas: res.totalExoneradas,
          totalExportacion: res.totalExportacion,
          valorCompra: res.valorCompra.toFixed(2),
          igv: res.igv.toFixed(2),
          isc: res.isc,
          otrosTributos: res.otrosTributos,
          otrosCargos: res.otrosCargos,
          descuentosGlobales: res.descuentosGlobales,
          importeTotal: res.importeTotal.toFixed(2),
          tipoCambio: res.tipoCambio,
          idMoneda: res.idMoneda,
          serieGuia: res.serieGuia,
          correlativoGuia: res.correlativoGuia,
          estado: res.estado,
          fechaCreacion: res.fechaCreacion,
          usuarioCreacion: res.usuarioCreacion,
        });
        this.listarProveedor();
        this.modificar = true;
      });
  }

  async initParams() {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idComprobante'] === undefined) this.loading = false;
      if (params && params['idComprobante']) {
        this.IdComprobante = params['idComprobante'];
        this.readonlyId = this.IdComprobante ? true : false;
        this.listarComprobante();
      }
      if (params && params['modificar']) {
        this.readonlyOption = params['modificar'] !== '1' ? true : false;
        this.eliminar = params['modificar'] !== '1' ? true : false;
      }
    });
  }

  async listarProveedores() {
    this._proveedorService.listarPoveedores().subscribe((res) => {
      this.listaProveedores = res;
      this.listarProveedoresFiltro();
    });
  }

  async listarTipoDocumento() {
    this._tipoDocumentoService.listarTipoDocumento().subscribe((res) => {
      this.listaTipoDocumento = res;
    });
  }

  async listarMoneda() {
    this._monedaService.listarMonedas().subscribe((res) => {
      this.listaMoneda = res;
    });
  }

  async listarFormaPago() {
    this._formaPagoService.listarFormaPago().subscribe((res) => {
      this.listaFormaPago = res;
    });
  }

  agregarComprobante() {
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

    const comprobante: Comprobante = {
      idComprobante: this.form.value.idComprobante,
      serie: this.form.value.serie,
      correlativo: this.form.value.correlativo,
      idTipoDocumento: this.form.value.idTipoDocumento,
      idFormaPago: this.form.value.idFormaPago,
      idProveedor: this.modificar
        ? this.proveedor.idProveedor
        : this.form.value.idProveedor.idProveedor,
      fechaEmision: isNaN(parseInt(this.form.value.fechaEmision))
        ? formatoFechaGuion(this.form.value.fechaEmision)
        : this.form.value.fechaEmision,
      fechaVencimiento:
        this.form.value.fechaVencimiento !== ''
          ? isNaN(parseInt(this.form.value.fechaVencimiento))
            ? formatoFechaGuion(this.form.value.fechaVencimiento)
            : this.form.value.fechaVencimiento
          : this.form.value.fechaVencimiento,
      totalGravadas: this.form.value.totalGravadas,
      totalInafectas: this.form.value.totalInafectas,
      totalExoneradas: this.form.value.totalExoneradas,
      totalExportacion: this.form.value.totalExportacion,
      valorCompra: this.form.value.valorCompra,
      igv: this.form.value.igv,
      isc: this.form.value.isc,
      otrosTributos: this.form.value.otrosTributos,
      otrosCargos: this.form.value.otrosCargos,
      descuentosGlobales: this.form.value.descuentosGlobales,
      importeTotal: this.form.value.importeTotal,
      idMoneda: this.form.value.idMoneda,
      tipoCambio: this.form.value.tipoCambio,
      serieGuia: this.form.value.serieGuia,
      correlativoGuia: this.form.value.correlativoGuia,
      estado: this.modificar ? this.form.value.estado : 'A',
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : formatoFechaGuion(new Date()),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this._comprobanteService
        .actualizarComprobante(comprobante, comprobante.idComprobante)
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
            this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
          }
        );
    } else {
      this._comprobanteService.agregarComprobante(comprobante).subscribe(
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

  back() {
    this._router.navigate(['/dashboard/listar-comprobante']);
  }

  eliminarComprobante(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmacion: this.confirmacion,
        question: `¿Está seguro que desea eliminar al Tipo de documento ${this.IdComprobante}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this._comprobanteService
          .eliminarComprobante(this.form.value.idComprobante)
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

  asignarTipoCambio() {
    const _fechaEmision = formatoFechaGuion(this.form.value.fechaEmision);
    this._tipoCambioService
      .listaTipoCambioPorfecha(_fechaEmision)
      .subscribe((res: any) => {
        if (res.id === undefined)
          this.form.controls['tipoCambio'].setValue(res.compra);
        else this.form.controls['tipoCambio'].setValue('0.00');
      });
  }

  onKeyUpEvent(event: any) {
    const _valorCompra = event.target.value;
    let _igv = '0.00';
    if (_valorCompra != '') {
      _igv = (_valorCompra * 0.18).toFixed(2);
      this.form.controls['igv'].setValue(_igv);
      this.form.controls['importeTotal'].setValue(
        (parseFloat(_valorCompra) + parseFloat(_igv)).toFixed(2)
      );
    } else {
      this.form.controls['igv'].setValue(_igv);
      this.form.controls['importeTotal'].setValue(_igv);
    }
  }
}
