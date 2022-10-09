import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje } from 'src/shared/config';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css'],
})
export class CambiarContrasenaComponent implements OnInit {
  form: FormGroup;
  idEmpleado = '';
  codigoUsuario = '';
  loading: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idEmpleado: ['', Validators.required],
      codigoUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

  initParams(): void {
    this.codigoUsuario = this._usuarioService.currentUsuarioValue.codigoUsuario;
    this._usuarioService
      .listarUsuarioPorCodigoUsuario(
        this.codigoUsuario
      )
      .subscribe((res: any) => {
        this.form.setValue({
          codigoUsuario: res.codigoUsuario,
          idEmpleado: res.idEmpleado,
          contrasena: '',
          confirmarContrasena: '',
        });
        this.loading = false;
      });
  }

  actualizarContrasena() {
    if (this.form.value.contrasena !== this.form.value.confirmarContrasena) {
      this._snackBar.open(
        'Contraseña diferente',
        accion_mensaje.modificar_valor_ingresado,
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
    } else {
      const usuario: any = {
        codigoUsuario: this.form.value.codigoUsuario,
        idEmpleado: this.form.value.idEmpleado,
        contrasena: this.form.value.contrasena,
      };

      this._usuarioService.actualizarUsuario(usuario).subscribe(
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
  }

  back() {
    this._router.navigate(['/dashboard']);
  }
}
