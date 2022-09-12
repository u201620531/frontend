import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _empleadoService: EmpleadoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.empleado;
    this.listarEmpleadoes();
  }

  listarEmpleadoes() {
    this._empleadoService.listarEmpleados().subscribe(
      (res) => {
        this.listaEmpleados = res;
        this.dataSource = new MatTableDataSource<Empleado>();
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

  eliminarEmpleado(idEmpleado: string) {
    this._empleadoService.eliminarEmpleado(idEmpleado);
    this.listarEmpleadoes();

    this._snackBar.open('El Empleado fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
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
