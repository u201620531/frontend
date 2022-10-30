import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaContable } from 'src/app/interfaces/cuenta-contable';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { SoporteService } from 'src/app/services/soporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, estado_inicial, soporte } from 'src/shared/config';
import { formatoFechaGuion } from 'src/shared/functions';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-agregar-cuenta-contable',
  templateUrl: './agregar-cuenta-contable.component.html',
  styleUrls: ['./agregar-cuenta-contable.component.css'],
})
export class AgregarCuentaContableComponent implements OnInit {
  form: FormGroup;
  IdCuentaContable = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;
  loading: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _soporteService: SoporteService,
    private __uentaContableService: CuentaContableService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idCuentaContable: ['', Validators.required],
      nombre: ['', Validators.required],
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
      if (params && params['idCuentaContable'] === undefined)
        this.loading = false;
      if (params && params['idCuentaContable']) {
        this.IdCuentaContable = params['idCuentaContable'];
        this.readonlyId = this.IdCuentaContable ? true : false;
        this.__uentaContableService
          .listaCuentaContablePorIdCuentaContable(this.IdCuentaContable)
          .subscribe((res: any) => {
            this.loading = false;
            this.form.setValue({
              idCuentaContable: res.idCuentaContable,
              nombre: res.nombre,
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

  agregarCuentaContable() {
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

    const CuentaContable: CuentaContable = {
      idCuentaContable: this.form.value.idCuentaContable,
      nombre: this.form.value.nombre,
      estado: this.modificar ? this.form.value.estado : estado_inicial,
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : formatoFechaGuion(new Date()),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this.__uentaContableService
        .actualizarCuentaContable(
          CuentaContable,
          CuentaContable.idCuentaContable
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
            this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
          }
        );
    } else {
      this.__uentaContableService
        .agregarCuentaContable(CuentaContable)
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
    this._router.navigate(['/dashboard/listar-cuenta-contable']);
  }

  eliminarCuentaContable(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmacion,
        question: `¿Está seguro que desea eliminar la cuenta contable ${this.IdCuentaContable}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this.__uentaContableService
          .eliminarCuentaContable(this.form.value.idCuentaContable)
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
