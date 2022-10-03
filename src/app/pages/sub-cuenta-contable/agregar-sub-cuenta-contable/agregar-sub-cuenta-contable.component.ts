import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCuentaContable } from 'src/app/interfaces/sub-cuenta-contable';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { SubCuentaContableService } from 'src/app/services/sub-cuenta-contable.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, estado_inicial } from 'src/shared/config';
import { formatoFechaGuion } from 'src/shared/functions';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-agregar-sub-cuenta-contable',
  templateUrl: './agregar-sub-cuenta-contable.component.html',
  styleUrls: ['./agregar-sub-cuenta-contable.component.css'],
})
export class AgregarSubCuentaContableComponent implements OnInit {
  form: FormGroup;
  listaCuentasContables: any = [];
  idSubCuentaContable = '';
  idCuentaContable = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;
  loading: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _cuentaContableService: CuentaContableService,
    private _subCuentaContableService: SubCuentaContableService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idCuentaContable: ['', Validators.required],
      idSubCuentaContable: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  ngOnInit(): void {
    this.listarCuentasContables();
    this.initParams();
  }

  listarCuentasContables() {
    this._cuentaContableService.listarCuentasContables().subscribe((res) => {
      this.listaCuentasContables = res;
    });
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (
        params &&
        params['idCuentaContable'] ===undefined &&
        params['idSubCuentaContable'] === undefined
      )
        this.loading = false;
      if (
        params &&
        params['idCuentaContable'] &&
        params['idSubCuentaContable']
      ) {
        this.idCuentaContable = params['idCuentaContable'];
        this.idSubCuentaContable = params['idSubCuentaContable'];
        this.readonlyId = this.idSubCuentaContable ? true : false;
        this._subCuentaContableService
          .listaSubCuentaContablePorIdSubCuentaContable(
            this.idCuentaContable,
            this.idSubCuentaContable
          )
          .subscribe((res: any) => {
            this.idCuentaContable = res.idCuentaContable;
            this.loading = false;
            this.form.setValue({
              idSubCuentaContable: res.idSubCuentaContable,
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

  agregarSubCuentaContable() {
    const subCuentaContable: SubCuentaContable = {
      idSubCuentaContable: this.form.value.idSubCuentaContable,
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
      this._subCuentaContableService
        .actualizarSubCuentaContable(
          subCuentaContable,
          subCuentaContable.idCuentaContable,
          subCuentaContable.idSubCuentaContable
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
      this._subCuentaContableService
        .agregarSubCuentaContable(subCuentaContable)
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
  }

  back() {
    this._router.navigate(['/dashboard/listar-sub-cuenta-contable']);
  }

  eliminarSubCuentaContable(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmacion,
        question: `¿Está seguro que desea eliminar la subcuenta contable ${this.idSubCuentaContable}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this._subCuentaContableService
          .eliminarSubCuentaContable(
            this.form.value.idCuentaContable,
            this.form.value.idSubCuentaContable
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
      }
    });
  }
}
