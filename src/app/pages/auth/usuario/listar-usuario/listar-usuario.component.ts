import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, filters } from 'src/shared/config';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  listaUsuarios: Usuario[] = [];
  displayedColumns: string[] = [
    'nomEmpleado',
    'codigoUsuario',
    'nomPerfilUsuario',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<Usuario[]>;
  placeholderValue: string = '';
  viewOptions: boolean = true;
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
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.usuario;
    this.listarUsuarios();
  }

  listarUsuarios() {
    this._usuarioService.listarUsuarios().subscribe(
      (res) => {
        this.listaUsuarios = res;
        this.dataSource = new MatTableDataSource<Usuario[]>(res);
        this.loading = false;
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

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarUsuario(idEmpleado: string, idUsuario: string) {
    this._usuarioService.eliminarUsuario(idEmpleado, idUsuario).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarUsuarios();
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

  modificarUsuario(
    idEmpleado: string,
    codigoUsuario: string,
    modificar: number
  ): void {
    const extras: NavigationExtras = {
      queryParams: {
        idEmpleado: idEmpleado,
        codigoUsuario: codigoUsuario,
        modificar: modificar,
      },
    };
    this._router.navigate(['/dashboard/agregar-usuario'], extras);
  }
}
