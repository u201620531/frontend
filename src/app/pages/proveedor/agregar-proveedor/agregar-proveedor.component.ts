import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SoporteService } from 'src/app/services/soporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, estado_inicial, soporte } from 'src/shared/config';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css'],
})
export class AgregarProveedorComponent implements OnInit {
  form: FormGroup;
  listaTiposDocumento: any = [];
  listaTiposProveedor: any = [];
  IdProveedor = '';
  idTipoDocumento: string = '';
  idTipoProveedor: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _soporteService: SoporteService,
    private _proveedorService: ProveedorService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idProveedor: [''],
      idTipoProveedor: ['', Validators.required],
      idTipoDocumento: ['', Validators.required],
      nroDocumento: ['', Validators.required],
      razonSocial: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      direccion: ['', Validators.required],
      direccionFiscal: ['', Validators.required],
      email1: [''],
      email2: [''],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  ngOnInit(): void {
    this.listarTiposDocumento();
    this.listarTiposProveedor();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idProveedor']) {
        this.IdProveedor = params['idProveedor'];
        this.readonlyId = this.IdProveedor ? true : false;
        this._proveedorService
          .listarProveedorPoridProveedor(this.IdProveedor)
          .subscribe((res: any) => {
            this.idTipoDocumento = res.idTipoDocumento;
            this.idTipoProveedor = res.idTipoProveedor;
            this.form.setValue({
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

  listarTiposDocumento() {
    this._soporteService
      .listarSoporteById(soporte.tipoDocumentoProveedor)
      .subscribe((res) => {
        this.listaTiposDocumento = res;
      });
  }

  listarTiposProveedor() {
    this._soporteService
      .listarSoporteById(soporte.tipoProveedor)
      .subscribe((res) => {
        this.listaTiposProveedor = res;
      });
  }

  agregarProveedor() {
    const proveedor: Proveedor = {
      idProveedor: this.modificar ? this.form.value.idProveedor : '',
      idTipoProveedor: this.form.value.idTipoProveedor,
      idTipoDocumento: this.form.value.idTipoDocumento,
      nroDocumento: this.form.value.nroDocumento,
      razonSocial: this.form.value.razonSocial,
      nombreComercial: this.form.value.nombreComercial,
      direccion: this.form.value.direccion,
      direccionFiscal: this.form.value.direccionFiscal,
      email1: this.form.value.email1,
      email2: this.form.value.email2,
      estado: this.modificar ? this.form.value.estado : estado_inicial,
      fechaCreacion: this.modificar
        ? this.form.value.fechaCreacion
        : new Date().toLocaleDateString(),
      usuarioCreacion: this.modificar
        ? this.form.value.usuarioCreacion
        : this._usuarioService.currentUsuarioValue.codigoUsuario,
    };

    if (this.modificar) {
      this._proveedorService
        .actualizarProveedor(proveedor, proveedor.idProveedor)
        .subscribe(
          (res) => {
            const result: any = res;
            if (result.id === 1) this.back();
            this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
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
      console.log('prov',proveedor);
      this._proveedorService.agregarProveedor(proveedor).subscribe(
        (res) => {
          const result: any = res;
          this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
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
    this._router.navigate(['/dashboard/listar-proveedor']);
  }

  eliminarProveedor(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmacion,
        question: `¿Está seguro que desea eliminar al Proveedor ${this.IdProveedor}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this._proveedorService
          .eliminarProveedor(this.form.value.idProveedor)
          .subscribe(
            (res) => {
              const result: any = res;
              if (result.id === 1) this.back();
              this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000,
              });
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
