import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilUsuario } from 'src/app/interfaces/perfil-usuario';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, estado_inicial } from 'src/shared/config';

@Component({
  selector: 'app-agregar-perfil-usuario',
  templateUrl: './agregar-perfil-usuario.component.html',
  styleUrls: ['./agregar-perfil-usuario.component.css'],
})
export class AgregarPerfilUsuarioComponent implements OnInit {
  form: FormGroup;
  listaPerfilUsuario: PerfilUsuario[] = [];
  IdPerfilUsuario: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmation: boolean = false;
  modificar: boolean = false;
  loading: boolean = true;

  constructor(
    private _perfilUsuarioService: PerfilUsuarioService,
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idPerfilUsuario: ['', Validators.required],
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
      if (params && params['idPerfilUsuario'] === undefined) this.loading = false;
      if (params && params['idPerfilUsuario']) {
        this.IdPerfilUsuario = params['idPerfilUsuario'];
        this.readonlyId = this.IdPerfilUsuario ? true : false;
        this._perfilUsuarioService
          .listaPerfilUsuarioPoridPerfilUsuario(this.IdPerfilUsuario)
          .subscribe((res: any) => {
            this.form.setValue({
              idPerfilUsuario: res.idPerfilUsuario,
              nombre: res.nombre,
              estado: res.estado,
              fechaCreacion: res.fechaCreacion,
              usuarioCreacion: res.usuarioCreacion,
            });
            this.modificar = true;
            this.loading = false;
          });
      }
      if (params && params['modificar']) {
        this.readonlyOption = params['modificar'] !== '1' ? true : false;
        this.eliminar = params['modificar'] !== '1' ? true : false;
      }
    });
  }

  consultarPerfilUsuario(id: string) {
    return this._perfilUsuarioService.listaPerfilUsuarioPoridPerfilUsuario(id);
  }

  agregarPerfilUsuario() {
    const PerfilUsuario: PerfilUsuario = {
      idPerfilUsuario: this.form.value.idPerfilUsuario,
      nombre: this.form.value.nombre,
      estado: this.modificar ? this.form.value.estado : estado_inicial,
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : new Date().toLocaleDateString(),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this._perfilUsuarioService
        .actualizarPerfilUsuario(PerfilUsuario, PerfilUsuario.idPerfilUsuario)
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
      this._perfilUsuarioService.agregarPerfilUsuario(PerfilUsuario).subscribe(
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
    this._router.navigate(['/dashboard/listar-perfil-usuario']);
  }

  eliminarPerfilUsuario(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar el perfil de usuario ${this.IdPerfilUsuario}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        this._perfilUsuarioService
          .eliminarPerfilUsuario(this.form.value.idPerfilUsuario)
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
