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
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje } from 'src/shared/config';

@Component({
  selector: 'app-agregar-comprobante',
  templateUrl: './agregar-comprobante.component.html',
  styleUrls: ['./agregar-comprobante.component.css'],
})
export class AgregarComprobanteComponent implements OnInit {
  form: FormGroup;
  listaComprobante: Comprobante[] = [];
  listaTipoDocumento: TipoDocumento[] = [];
  listaMoneda: Moneda[] = [];
  listaFormaPago: FormaPago[] = [];
  IdComprobante: string = '';
  transactionTypeId: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;

  subscription = new Subscription();
  typeList: any = [{}];

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _monedaService: MonedaService,
    private _formaPagoService: FormaPagoService,
    private _comprobanteService: ComprobanteService,
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idComprobante: [''],
      serie: ['', Validators.required],
      correlativo: ['', Validators.required],
      idTipoDocumento: ['', Validators.required],
      idFormaPago: ['', Validators.required],
      idProveedor: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      totalGravadas: [0],
      totalInafectas: [0],
      totalExoneradas: [0],
      totalExportacion: [0],
      valorCompra: [0, Validators.required],
      igv: [0, Validators.required],
      isc: [0, Validators.required],
      otrosTributos: [0],
      otrosCargos: [0],
      descuentosGlobales: [0, Validators.required],
      importeTotal: [0, Validators.required],
      idMoneda: ['', Validators.required],
      serieGuia: [''],
      correlativoGuia: [''],
      estado: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioCreacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarMoneda();
    this.listarFormaPago();
    this.listarTipoDocumento();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idComprobante']) {
        this.IdComprobante = params['idComprobante'];
        this.readonlyId = this.IdComprobante ? true : false;
        this._comprobanteService
          .listarComprobantePorId(this.IdComprobante)
          .subscribe((res: any) => {
            this.form.setValue({
              idComprobante: res.idComprobante,
              serie: res.serie,
              correlativo: res.correlativo,
              idTipoDocumento: res.idTipoDocumento,
              idFormaPago: res.idFormaPago,
              idProveedor: res.idProveedor,
              fechaEmision: res.fechaEmision,
              fechaVencimiento: res.fechaVencimiento,
              totalGravadas: res.totalGravadas,
              totalInafectas: res.totalInafectas,
              totalExoneradas: res.totalExoneradas,
              totalExportacion: res.totalExportacion,
              valorCompra: res.valorCompra,
              igv: res.igv,
              isc: res.isc,
              otrosTributos: res.otrosTributos,
              otrosCargos: res.otrosCargos,
              descuentosGlobales: res.descuentosGlobales,
              importeTotal: res.importeTotal,
              idMoneda: res.idMoneda,
              serieGuia: res.serieGuia,
              correlativoGuia: res.correlativoGuia,
              estado: res.estado,
              fechaCreacion: res.fechaCreacion,
              usuarioCreacion: res.usuarioCreacion,
            });
            this.modificar = true;
          });
      }
      if (params && params['modificar']) {
        this.readonlyOption = params['modificar'] !== '1' ? true : false;
        this.eliminar = params['modificar'] !== '1' ? true : false;
      }
    });
  }

  listarTipoDocumento() {
    this._tipoDocumentoService.listarTipoDocumento().subscribe((res) => {
      this.listaTipoDocumento = res;
    });
  }

  listarMoneda() {
    this._monedaService.listarMonedas().subscribe((res) => {
      this.listaMoneda = res;
    });
  }

  listarFormaPago() {
    this._formaPagoService.listarFormaPago().subscribe((res) => {
      this.listaFormaPago = res;
    });
  }

  agregarComprobante() {
    const comprobante: Comprobante = {
      idComprobante: this.form.value.idComprobante,
      serie: this.form.value.serie,
      correlativo: this.form.value.correlativo,
      idTipoDocumento: this.form.value.idTipoDocumento,
      idFormaPago: this.form.value.idFormaPago,
      idProveedor: this.form.value.idProveedor,
      fechaEmision: this.form.value.fechaEmision,
      fechaVencimiento: this.form.value.fechaVencimiento,
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
      serieGuia: this.form.value.serieGuia,
      correlativoGuia: this.form.value.correlativoGuia,
      estado: this.modificar ? this.form.value.estado : 'A',
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : new Date().toLocaleDateString(),
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
}
