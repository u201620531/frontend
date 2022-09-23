import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { accion_mensaje, filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-forma-pago',
  templateUrl: './listar-forma-pago.component.html',
  styleUrls: ['./listar-forma-pago.component.css'],
})
export class ListarFormaPagoComponent implements OnInit {
  listaFormaPago: FormaPago[] = [];
  displayedColumns: string[] = [
    'idFormaPago',
    'descripcion',
    'abreviatura',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<FormaPago[]>;
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
    private _FormaPagoService: FormaPagoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.formaPago;
    this.listarFormasPago();
  }

  listarFormasPago() {
    this._FormaPagoService.listarFormaPago().subscribe(
      (res) => {
        this.listaFormaPago = res;
        this.viewOptions = this.listaFormaPago.length > 0;
        this.dataSource = new MatTableDataSource<FormaPago[]>(res);
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

  eliminarFormaPago(idFormaPago: string) {
    this._FormaPagoService.eliminarFormaPago(idFormaPago).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarFormasPago();
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

  modificarFormaPago(idFormaPago: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idFormaPago: idFormaPago,
        edit: edit,
      },
    };

    this._router.navigate(['/dashboard/agregar-forma-pago'], extras);
  }
}
