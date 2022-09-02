import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { FormaPagoService } from 'src/app/services/forma-pago.service';


@Component({
  selector: 'app-agregar-forma-pago',
  templateUrl: './agregar-forma-pago.component.html',
  styleUrls: ['./agregar-forma-pago.component.css']
})
export class AgregarFormaPagoComponent implements OnInit {
    form: FormGroup;
  listaFormaPago: FormaPago[] = [];
  idFormaPago: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmation: boolean = false;
  modificar: boolean = false;

  constructor(
    private _formaPagoService: FormaPagoService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
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
      if (params && params['idFormaPago']) {
        this.idFormaPago = params['idFormaPago'];
        this.readonlyId = this.idFormaPago ? true : false;
        this._formaPagoService
          .listarFormaPagoPorId(this.idFormaPago)
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
          });
      }
      if (params && params['modificar']) {
        this.readonlyOption = params['modificar'] !== '1' ? true : false;
        this.eliminar = params['modificar'] !== '1' ? true : false;
      }
    });
  }

  agregarFormaPago() {
    const creationUser = 'jlre';
    const formaPago: FormaPago = {
      idFormaPago: this.form.value.idFormaPago,
      descripcion: this.form.value.descripcion,
      abreviatura: this.form.value.abreviatura,
      estado: 'A',
      fechaCreacion: new Date().toLocaleDateString(),
      usuarioCreacion: creationUser,
    };

    if (this.modificar) {
      this._formaPagoService.actualizarFormaPago(formaPago, formaPago.idFormaPago).subscribe(
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
      this._formaPagoService.agregarFormaPago(formaPago).subscribe(
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
  }

  back() {
    this._router.navigate(['/dashboard/listar-forma-pago']);
  }

  eliminarformaPago(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar la Forma de pago '${this.idFormaPago}'?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        this._formaPagoService.eliminarFormaPago(this.form.value.idFormaPago).subscribe(
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
