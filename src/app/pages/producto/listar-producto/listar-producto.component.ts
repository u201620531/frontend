import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { accion_mensaje, filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css'],
})
export class ListarProductoComponent implements OnInit {
  listaProductos: Producto[] = [];

  displayedColumns: string[] = [
    'idProducto',
    'desCategoriaProducto',
    'descripcion',
    'abreviatura',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Producto[]>;
  placeholderValue: string = '';

  viewOptions: boolean = false;
  private paginator!: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    if (ms !== undefined) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp !== undefined) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private _productoService: ProductoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.producto;
    this.listarProductos();
  }

  listarProductos() {
    this._productoService.listarProductos().subscribe(
      (res) => {
        this.listaProductos = res;
        this.viewOptions = this.listaProductos.length > 0;
        this.dataSource = new MatTableDataSource<Producto[]>(res);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarProducto(idProducto: string) {
    this._productoService.eliminarProducto(idProducto).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarProductos();
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

  modificarProducto(idProducto: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idProducto: idProducto,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-producto'], extras);
  }
}
