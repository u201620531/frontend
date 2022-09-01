import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Comprobante } from 'src/app/interfaces/comprobante';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-comprobante',
  templateUrl: './listar-comprobante.component.html',
  styleUrls: ['./listar-comprobante.component.css']
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
  dataSource!: MatTableDataSource<Comprobante>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _ComprobanteService: ComprobanteService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.comprobante	;
    this.listarComprobante();
  }

  listarComprobante() {
    this._ComprobanteService.listarComprobante().subscribe(
      (res) => {
        this.listaComprobante = res;
        this.dataSource = new MatTableDataSource<Comprobante>();
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

  eliminarComprobante(idComprobante: string) {
    this._ComprobanteService.eliminarComprobante(idComprobante).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
        if (result.id === 1) this.listarComprobante();
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
