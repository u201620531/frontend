import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, estado_inicial } from 'src/shared/config';

@Component({
  selector: 'app-agregar-forma-pago',
  templateUrl: './agregar-forma-pago.component.html',
  styleUrls: ['./agregar-forma-pago.component.css'],
})
export class AgregarFormaPagoComponent implements OnInit {
  form: FormGroup;
  listaFormaPago: FormaPago[] = [];
  listSupportTables: any = [];
  IdFormaPago: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmation: boolean = false;
  modificar: boolean = false;
  loading: boolean = true;

  constructor(
    private _formaPagoService: FormaPagoService,
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idFormaPago: ['', Validators.required],
      descripcion: ['', Validators.required],
      abreviatura: ['', Validators.required],
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
      if (params && params['idFormaPago'] === undefined) this.loading = false;
      if (params && params['idFormaPago']) {
        this.IdFormaPago = params['idFormaPago'];
        this.readonlyId = this.IdFormaPago ? true : false;
        this._formaPagoService
          .listarFormaPagoPorId(this.IdFormaPago)
          .subscribe((res: any) => {
            this.form.setValue({
              idFormaPago: res.idFormaPago,
              descripcion: res.descripcion,
              abreviatura: res.abreviatura,
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

  agregarFormaPago() {    
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
    
    const FormaPago: FormaPago = {
      idFormaPago: this.form.value.idFormaPago,
      descripcion: this.form.value.descripcion,
      abreviatura: this.form.value.abreviatura,
      estado: this.modificar ? this.form.value.estado : estado_inicial,
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : new Date().toLocaleDateString(),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this._formaPagoService
        .actualizarFormaPago(FormaPago, FormaPago.idFormaPago)
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
      this._formaPagoService.agregarFormaPago(FormaPago).subscribe(
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
    this._router.navigate(['/dashboard/listar-forma-pago']);
  }

  eliminarFormaPago(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar la forma de pago ${this.IdFormaPago}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        this._formaPagoService
          .eliminarFormaPago(this.form.value.idFormaPago)
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
