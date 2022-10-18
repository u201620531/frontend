import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { accion_mensaje, filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css'],
})
export class ListarEmpleadoComponent implements OnInit {
  listaEmpleados: Empleado[] = [];
  displayedColumns: string[] = [
    'idEmpleado',
    'desCargo',
    'nombre',
    'apellido',
    'direccion',
    'telefono',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Empleado>;
  placeholderValue: string = '';
  private paginator: MatPaginator;
  private sort: MatSort;
  loading = false;

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
    private _empleadoService: EmpleadoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.empleado;
    this.listarEmpleados();
  }

  listarEmpleados() {
    this._empleadoService.listarEmpleados().subscribe(
      (res) => {
        this.listaEmpleados = res;
        this.dataSource = new MatTableDataSource<Empleado>();
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  eliminarEmpleado(idEmpleado: string) {
    this._empleadoService.eliminarEmpleado(idEmpleado).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarEmpleados();
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

  modificarEmpleado(idEmpleado: string, modificar: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idEmpleado: idEmpleado,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-empleado'], extras);
  }
}
