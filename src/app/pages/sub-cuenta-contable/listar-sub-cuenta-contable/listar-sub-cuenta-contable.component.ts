import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { SubCuentaContable } from 'src/app/interfaces/sub-cuenta-contable';
import { SubCuentaContableService } from 'src/app/services/sub-cuenta-contable.service';
import { accion_mensaje, filters } from 'src/shared/config';
import { CustomPaginator } from '../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-sub-cuenta-contable',
  templateUrl: './listar-sub-cuenta-contable.component.html',
  styleUrls: ['./listar-sub-cuenta-contable.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ListarSubCuentaContableComponent implements OnInit {
  listaSubCuentasContables: SubCuentaContable[] = [];
  displayedColumns: string[] = [
    'idCuentaContable',
    'nomCuentaContable',
    'idSubCuentaContable',
    'nombre',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<SubCuentaContable[]>;
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
    private _subCuentaContableService: SubCuentaContableService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.placeholderValue = filters.placeholders.subCuentaContable;
    this.listarSubCuentasContables();
  }

  async listarSubCuentasContables() {
    this._subCuentaContableService.listarSubCuentasContables().subscribe(
      (res) => {
        this.listaSubCuentasContables = res;
        this.dataSource = new MatTableDataSource<SubCuentaContable[]>(res);
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

  eliminarSubCuentaContable(
    idCuentaContable: string,
    idSubCuentaContable: string
  ) {
    this._subCuentaContableService
      .eliminarSubCuentaContable(idCuentaContable, idSubCuentaContable)
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
          if (result.id === 1) this.listarSubCuentasContables();
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

  modificarSubCuentaContable(
    idCuentaContable: string,
    idSubCuentaContable: string,
    modificar: number
  ): void {
    const extras: NavigationExtras = {
      queryParams: {
        idCuentaContable: idCuentaContable,
        idSubCuentaContable: idSubCuentaContable,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-sub-cuenta-contable'], extras);
  }
}
