import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-tipo-documento',
  templateUrl: './listar-tipo-documento.component.html',
  styleUrls: ['./listar-tipo-documento.component.css']
})
export class ListarTipoDocumentoComponent implements OnInit {
  listaTipoDocumento: TipoDocumento[] = [];

  displayedColumns: string[] = [
    'idTipoDocumento',
    'descripcion',
    'abreviatura',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<TipoDocumento>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
        this.dataSource = new MatTableDataSource<TipoDocumento>();
        this.dataSource.data = res;
        console.log(this.dataSource.data),
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

  eliminarTipoDocumento(idTipoDocumento: string) {
    this._TipoDocumentoService.eliminarTipoDocumento(idTipoDocumento).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
        if (result.id === 1) this.listarTipoDocumento();
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
