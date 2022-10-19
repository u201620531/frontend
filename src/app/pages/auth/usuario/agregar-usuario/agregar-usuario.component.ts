import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  accion_mensaje,
  contrasena_inicial,
  estado_inicial,
} from 'src/shared/config';
import { ConfirmationModalComponent } from '../../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent implements OnInit {
  form: FormGroup;
  listaEmpleados: any = [];
  listaPerfilesUsuario: any = [];
  idEmpleado = '';
  codigoUsuario = '';
  idPerfilUsuario: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;

  constructor(
    private _empleadoService: EmpleadoService,
    private _perfilUsuarioService: PerfilUsuarioService,
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idEmpleado: ['', Validators.required],
      codigoUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      idPerfilUsuario: ['', Validators.required],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  ngOnInit(): void {
    this.listarEmpleados();
    this.listarPerfilesUsuario();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idEmpleado'] && params['codigoUsuario']) {
        this.idEmpleado = params['idEmpleado'];
        this.codigoUsuario = params['codigoUsuario'];
        this.readonlyId = this.codigoUsuario ? true : false;
        this._usuarioService
          .listarUsuarioPorCodigoUsuario(
            this.codigoUsuario
          )
          .subscribe((res: any) => {
            this.idPerfilUsuario = res.idPerfilUsuario;
            this.form.setValue({
              codigoUsuario: res.codigoUsuario,
              idEmpleado: res.idEmpleado,
              contrasena: res.contrasena,
              confirmarContrasena: res.contrasena,
              idPerfilUsuario: res.idPerfilUsuario,
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

  consultarEmpleado() {
    this._empleadoService
      .listarEmpleadoPoridEmpleado(this.idEmpleado)
      .subscribe(
        (res: any) => {
          let nomUsuario = '';
          const espacioApellido = res.nombre.indexOf(' ');
          if (espacioApellido > -1)
            nomUsuario = res.nombre.substring(0, espacioApellido);
          else nomUsuario = res.nombre;
          const anoUsuario = new Date(res.fechaNacimiento);
          const codUsuario =
            res.apellido.substring(0, 1) +
            nomUsuario.toLowerCase() +
            (anoUsuario.getMonth() + 1).toString().padStart(2, '0') +
            anoUsuario.getFullYear().toLocaleString();
          this.form.controls['codigoUsuario'].setValue(codUsuario);
        },
        (err) => {
          this._snackBar.open(err.message, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        }
      );
  }

  listarEmpleados() {
    this._empleadoService.listarEmpleados().subscribe((res) => {
      this.listaEmpleados = res;
    });
  }

  listarPerfilesUsuario() {
    this._perfilUsuarioService.listarPerfilesUsuario().subscribe((res) => {
      this.listaPerfilesUsuario = res;
    });
  }

  agregarUsuario() {
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
      const usuario: Usuario = {
        codigoUsuario: this.form.value.codigoUsuario,
        idEmpleado: this.form.value.idEmpleado,
        idPerfilUsuario: this.form.value.idPerfilUsuario,
        contrasena: this.modificar
          ? this.form.value.contrasena
          : contrasena_inicial,
        estado: this.modificar ? this.form.value.estado : estado_inicial,
        fechaCreacion: this.modificar
          ? this.form.value.fechaCreacion
          : new Date().toLocaleDateString(),
        usuarioCreacion: this.modificar
          ? this.form.value.usuarioCreacion
          : this._usuarioService.currentUsuarioValue.codigoUsuario,
      };
      if (this.modificar) {
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
      } else {
        this._usuarioService.agregarUsuario(usuario).subscribe(
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
  }

  back() {
    this._router.navigate(['/dashboard/listar-usuario']);
  }

  eliminarUsuario(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmacion,
        question: `¿Está seguro que desea eliminar al Usuario ${this.codigoUsuario}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this._usuarioService
          .eliminarUsuario(
            this.form.value.idEmpleado,
            this.form.value.codigoUsuario
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
