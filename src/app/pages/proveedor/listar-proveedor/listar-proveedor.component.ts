import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css'],
})
export class ListarProveedorComponent implements OnInit {
  listaProveedores: Proveedor[] = [];
  displayedColumns: string[] = [
    'idProveedor',
    'idTipoProveedor',
    'idTipoDocumento',
    'nroDocumento',
    'razonSocial',
    'nombreComercial',
    'direccion',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Proveedor>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _proveedorService: ProveedorService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.proveedor;
    this.listarProveedores();
  }

  listarProveedores() {
    this._proveedorService.listarPoveedores().subscribe(
      (res) => {
        this.listaProveedores = res;
        this.dataSource = new MatTableDataSource<Proveedor>();
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

  eliminarProveedor(idProveedor: string) {
    this._proveedorService.eliminarProveedor(idProveedor);
    this.listarProveedores();

    this._snackBar.open('El Proveedor fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  modificarProveedor(idProveedor: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idProveedor: idProveedor,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-proveedor'], extras);
  }
}
