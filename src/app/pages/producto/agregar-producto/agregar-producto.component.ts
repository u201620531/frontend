import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { ProductoService } from 'src/app/services/producto.service';
import { SoporteService } from 'src/app/services/soporte.service';
import { soporte } from 'src/shared/config';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  form: FormGroup;
  listaProductos: Producto[] = [];
  listaCategoriasProducto: any = [];
  idProducto: string = '';
  idCategoriaProducto: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  eliminar: boolean = true;
  confirmacion: boolean = false;
  modificar: boolean = false;

  constructor(
    private _productoService: ProductoService,
    private _soporteService: SoporteService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      idProducto: ['', Validators.required],
      idCategoriaProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      abreviatura: ['', Validators.required],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  ngOnInit(): void {
    this.listarCategoriasProducto();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idProducto']) {
        this.idProducto = params['idProducto'];
        this.readonlyId = this.idProducto ? true : false;
        this._productoService
          .listarProductoPorId(this.idProducto)
          .subscribe((res: any) => {
            this.idCategoriaProducto = res.idCategoriaProducto;
            this.form.setValue({
              idProducto: res.idProducto,
              idCategoriaProducto: res.idCategoriaProducto,
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

  listarCategoriasProducto() {
    this._soporteService
      .listarSoporteById(soporte.categoriaProducto)
      .subscribe((res) => {
        this.listaCategoriasProducto = res;
      });
  }

  agregarProducto() {
    const usuarioCreacion = 'jlre';
    const product: Producto = {
      idProducto: this.form.value.idProducto,
      idCategoriaProducto: this.form.value.idCategoriaProducto,
      descripcion: this.form.value.descripcion,
      abreviatura: this.form.value.abreviatura,
      estado: 'A',
      fechaCreacion: new Date().toLocaleDateString(),
      usuarioCreacion: usuarioCreacion,
    };

    if (this.modificar) {
      this._productoService
        .actualizarProducto(product, product.idProducto)
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
      this._productoService.agregarProducto(product).subscribe(
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
    this._router.navigate(['/dashboard/listar-producto']);
  }

  eliminarProducto(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmacion,
        question: `¿Está seguro que desea eliminar el producto '${this.idProducto}'?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmacion = result;
      if (this.confirmacion) {
        this._productoService
          .eliminarProducto(this.form.value.idProduct)
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
