import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { CuentaContable } from 'src/app/interfaces/cuenta-contable';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { accion_mensaje, filters } from 'src/shared/config';
import { CustomPaginator } from '../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-cuenta-contable',
  templateUrl: './listar-cuenta-contable.component.html',
  styleUrls: ['./listar-cuenta-contable.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ListarCuentaContableComponent implements OnInit {
  listaCuentasContables: CuentaContable[] = [];
  displayedColumns: string[] = [
    'idCuentaContable',
    'nombre',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<CuentaContable[]>;
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
    private _cuentaContableService: CuentaContableService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.placeholderValue = filters.placeholders.cuentaContable;
    this.listarCuentasContables();
  }

  async listarCuentasContables() {
    this._cuentaContableService.listarCuentasContables().subscribe(
      (res) => {
        this.listaCuentasContables = res;
        this.dataSource = new MatTableDataSource<CuentaContable[]>(res);
        this.loading = false;
      },
      (err) => {
        this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        this.loading = false;
      }
    );
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarCuentaContable(idCuentaContable: string) {
    this._cuentaContableService
      .eliminarCuentaContable(idCuentaContable)
      .subscribe(
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
          if (result.id === 1) this.listarCuentasContables();
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

  modificarCuentaContable(idCuentaContable: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idCuentaContable: idCuentaContable,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-cuenta-contable'], extras);
  }
}
