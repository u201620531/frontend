import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCambio } from 'src/app/interfaces/tipo-cambio';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, estado_inicial } from 'src/shared/config';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { formatoFechaGuion } from 'src/shared/functions';

@Component({
  selector: 'app-agregar-tipo-cambio',
  templateUrl: './agregar-tipo-cambio.component.html',
  styleUrls: ['./agregar-tipo-cambio.component.css'],
})
export class AgregarTipoCambioComponent implements OnInit {
  form: FormGroup;
  listaTipoCambio: any = [];
  fecha = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;
  loading: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _tipoCambioService: TipoCambioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      fecha: ['', Validators.required],
      compra: ['', Validators.required],
      venta: ['', Validators.required],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['fecha'] === undefined) this.loading = false;
      if (params && params['fecha']) {
        this.fecha = params['fecha'];
        this.readonlyId = this.fecha ? true : false;
        this._tipoCambioService
          .listaTipoCambioPorfecha(this.fecha)
          .subscribe((res: any) => {
            this.loading = false;
            this.form.setValue({
              fecha: res.fecha,
              compra: res.compra,
              venta: res.venta,
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

  agregarTipoCambio() {
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
    const tipoCambio: TipoCambio = {
      fecha:
        this.form.value.fecha !== null
          ? formatoFechaGuion(this.form.value.fecha)
          : this.form.value.fecha,
      compra: this.form.value.compra,
      venta: this.form.value.venta,
      estado: this.modificar ? this.form.value.estado : estado_inicial,
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : formatoFechaGuion(new Date()),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this._tipoCambioService
        .actualizarTipoCambio(tipoCambio, tipoCambio.fecha)
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
      this._tipoCambioService.agregarTipoCambio(tipoCambio).subscribe(
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
    this._router.navigate(['/dashboard/listar-tipo-cambio']);
  }

  eliminarTipoCambio(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmacion,
        question: `¿Está seguro que desea eliminar el tipo de cambio del día ${this.fecha}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this._tipoCambioService
          .eliminarTipoCambio(this.form.value.fecha)
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
