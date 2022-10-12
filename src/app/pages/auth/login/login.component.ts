import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { accion_mensaje, auditoriaLog } from 'src/shared/config';
import { AuditoriaService } from 'src/app/services/auditoria.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/dashboard';
  error = '';
  auditoria: any;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _auditoriaService: AuditoriaService,
    private _usuarioService: UsuarioService
  ) {
    if (this._usuarioService.currentUsuarioValue) {
      this._router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      codigoUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const result: any =
      await this._usuarioService.listarUsuarioPorCodigoUsuarioyContrasena(
        this.loginForm.value.codigoUsuario,
        this.loginForm.value.contrasena
      );
    if (result && result.idEmpleado != undefined && result.idEmpleado !== '') {
      this.auditoria = {
        fecha: new Date(),
        opcion: auditoriaLog.opciones.login,
        proceso: auditoriaLog.procesos.acceso,
        codigoError: '',
        mensageError: '',
        detalleError: '',
        codigoUsuario: this.loginForm.value.codigoUsuario,
      };
      this._auditoriaService
        .agregarAuditoria(this.auditoria)
        .subscribe((res) => {});
      this._router.navigate([this.returnUrl]);
    } else {
      if (result) {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.login,
          proceso: auditoriaLog.procesos.acceso,
          codigoError: result.id,
          mensageError: result.message,
          detalleError: result.detail,
          codigoUsuario: this.loginForm.value.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});
        this.error = result.detail;
        this._snackBar.open(
          this.error,
          accion_mensaje.modificar_valor_ingresado,
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          }
        );
        this.loading = false;
      } else {
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.login,
          proceso: auditoriaLog.procesos.acceso,
          codigoError: '00',
          mensageError: result.message,
          detalleError: this.error,
          codigoUsuario: this.loginForm.value.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});
        this._snackBar.open(this.error, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        });
      }
    }
  }
}
