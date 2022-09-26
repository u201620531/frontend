import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { accion_mensaje, filters } from 'src/shared/config';
import { CustomPaginator } from '../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-tipo-documento',
  templateUrl: './listar-tipo-documento.component.html',
  styleUrls: ['./listar-tipo-documento.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ListarTipoDocumentoComponent implements OnInit {
  listaTipoDocumento: TipoDocumento[] = [];

  displayedColumns: string[] = [
    'idTipoDocumento',
    'descripcion',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<TipoDocumento[]>;
  placeholderValue: string = '';
  viewOptions: boolean = false;
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
    private _TipoDocumentoService: TipoDocumentoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.tipoDocumento;
    this.listarTipoDocumento();
  }

  listarTipoDocumento() {
    this._TipoDocumentoService.listarTipoDocumento().subscribe(
      (res) => {
        this.listaTipoDocumento = res;
        this.viewOptions = this.listaTipoDocumento.length > 0;
        this.dataSource = new MatTableDataSource<TipoDocumento[]>(res);
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

  eliminarTipoDocumento(idTipoDocumento: string) {
    this._TipoDocumentoService.eliminarTipoDocumento(idTipoDocumento).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarTipoDocumento();
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

  modificarTipoDocumento(idTipoDocumento: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idTipoDocumento: idTipoDocumento,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-tipo-documento'], extras);
  }
}
