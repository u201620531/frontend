import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { TipoCambio } from 'src/app/interfaces/tipo-cambio';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { accion_mensaje, filters } from 'src/shared/config';
import { CustomPaginator } from '../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-tipo-cambio',
  templateUrl: './listar-tipo-cambio.component.html',
  styleUrls: ['./listar-tipo-cambio.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ListarTipoCambioComponent implements OnInit {
  listaTiposCambio: TipoCambio[] = [];
  displayedColumns: string[] = [
    'fecha',
    'compra',
    'venta',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<TipoCambio[]>;
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
    private _TipoCambioService: TipoCambioService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.placeholderValue = filters.placeholders.tipoCambio;
    this.listarTipoCambioes();
  }

  async listarTipoCambioes() {
    this._TipoCambioService.listarTiposCambio().subscribe(
      (res) => {
        this.listaTiposCambio = res;
        this.dataSource = new MatTableDataSource<TipoCambio[]>(res);
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

  eliminarTipoCambio(fecha: string) {
    this._TipoCambioService.eliminarTipoCambio(fecha).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarTipoCambioes();
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

  modificarTipoCambio(fecha: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        fecha: fecha,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-tipo-cambio'], extras);
  }
}
