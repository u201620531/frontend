import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Comprobante } from 'src/app/interfaces/comprobante';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { accion_mensaje, filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-comprobante',
  templateUrl: './listar-comprobante.component.html',
  styleUrls: ['./listar-comprobante.component.css'],
})
export class ListarComprobanteComponent implements OnInit {
  listaComprobante: Comprobante[] = [];

  displayedColumns: string[] = [
    'item',
    'idComprobante',
    'serie',
    'correlativo',
    'fechaEmision',
    'razonSocial',
    'tipoDocumento',
    'formaPago',
    'total',
    'moneda',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Comprobante[]>;
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
    private _ComprobanteService: ComprobanteService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.comprobante;
    this.listarComprobante();
  }

  listarComprobante() {
    this._ComprobanteService.listarComprobante().subscribe(
      (res) => {
        this.listaComprobante = res;
        this.dataSource = new MatTableDataSource<Comprobante[]>(res);
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

  eliminarComprobante(idComprobante: string) {
    this._ComprobanteService.eliminarComprobante(idComprobante).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarComprobante();
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

  modificarComprobante(idComprobante: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idComprobante: idComprobante,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-comprobante'], extras);
  }
}
