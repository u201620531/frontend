import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-agregar-tipo-documento',
  templateUrl: './agregar-tipo-documento.component.html',
  styleUrls: ['./agregar-tipo-documento.component.css']
})
export class AgregarTipoDocumentoComponent implements OnInit {
  form: FormGroup;
  listaTipoDocumento: TipoDocumento[] = [];
  listSupportTables: any = [];
  IdTipoDocumento: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmation: boolean = false;
  modificar: boolean = false;

  constructor(
    private _TipoDocumentoService: TipoDocumentoService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idTipoDocumento: ['', Validators.required],
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
      if (params && params['idTipoDocumento']) {
        this.IdTipoDocumento = params['idTipoDocumento'];
        this.readonlyId = this.IdTipoDocumento ? true : false;
        this._TipoDocumentoService
          .listarTipoDocumentoPorId(this.IdTipoDocumento)
          .subscribe((res: any) => {
            this.form.setValue({
              idTipoDocumento: res.idTipoDocumento,
              descripcion: res.descripcion,
              abreviatura: res.abreviatura,
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

  consultarTipoDocumento(id: string) {
    return this._TipoDocumentoService.listarTipoDocumentoPorId(id);
  }

  agregarTipoDocumento() {
    const creationUser = 'jlre';
    const TipoDocumento: TipoDocumento = {
      idTipoDocumento: this.form.value.idTipoDocumento,
      descripcion: this.form.value.descripcion,
      abreviatura: this.form.value.abreviatura,
      estado: 'A',
      fechaCreacion: new Date().toLocaleDateString(),
      usuarioCreacion: creationUser
    };

    if (this.modificar) {
      this._TipoDocumentoService
        .actualizarTipoDocumento(TipoDocumento, TipoDocumento.idTipoDocumento)
        .subscribe(
          (res) => {
            const result: any = res;
            if (result.id === 1) this.back();
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          },
          (err) => {
            this._snackBar.open(err.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          }
        );
    } else {
      this._TipoDocumentoService.agegarTipoDocumento(TipoDocumento).subscribe(
        (res) => {
          const result: any = res;
          this._snackBar.open(result.message, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
          if (result.id === 1) this.back();
        },
        (err) => {
          this._snackBar.open(err.message, '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
        }
      );
    }
  }

  back() {
    this._router.navigate(['/dashboard/listar-tipo-documento']);
  }

  eliminarTipoDocumento(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar al Tipo de documento ${this.IdTipoDocumento}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        this._TipoDocumentoService
          .eliminarTipoDocumento(this.form.value.idTipoDocumento)
          .subscribe(
            (res) => {
              const result: any = res;
              if (result.id === 1) this.back();
              this._snackBar.open(result.message, '', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 1500,
              });
            },
            (err) => {
              this._snackBar.open(err.message, '', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 1500,
              });
            }
          );
      }
    });
  }
}
