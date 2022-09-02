import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { filters } from 'src/shared/config';

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
  dataSource!: MatTableDataSource<Producto>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
        this.dataSource = new MatTableDataSource<Producto>();
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    this._productoService.eliminarProducto(idProducto);
    this.listarProductos();

    this._snackBar.open('El Producto fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  modificarProducto(idProducto: string, modificar:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idProducto: idProducto,
        modificar: modificar
      },
    };
    this._router.navigate(['/dashboard/agregar-producto'], extras);
  }
}
