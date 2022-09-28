import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { accion_mensaje, filters } from 'src/shared/config';
import { CustomPaginator } from '../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }]
})
export class ListarProveedorComponent implements OnInit {
  listaProveedores: Proveedor[] = [];
  displayedColumns: string[] = [
    'idProveedor',
    'idTipoDocumento',
    'nroDocumento',
    'razonSocial',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Proveedor[]>;
  placeholderValue: string = '';
  private paginator!: MatPaginator;
  private sort: MatSort;
  loading: boolean = true;

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
    private _proveedorService: ProveedorService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.placeholderValue = filters.placeholders.proveedor;
    this.listarProveedores();
  }

  async listarProveedores() {
    this._proveedorService.listarPoveedores().subscribe(
      (res) => {
        this.listaProveedores = res;
        this.dataSource = new MatTableDataSource<Proveedor[]>(res);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        console.log(err.message);
      }
    );
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarProveedor(idProveedor: string) {
    this._proveedorService.eliminarProveedor(idProveedor).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarProveedores();
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
