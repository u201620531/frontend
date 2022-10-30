import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { PerfilUsuario } from 'src/app/interfaces/perfil-usuario';
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { accion_mensaje, filters } from 'src/shared/config';
import { CustomPaginator } from '../../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-perfil-usuario',
  templateUrl: './listar-perfil-usuario.component.html',
  styleUrls: ['./listar-perfil-usuario.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ListarPerfilUsuarioComponent implements OnInit {
  listaPerfilesUsuario: PerfilUsuario[] = [];
  displayedColumns: string[] = [
    'idPerfilUsuario',
    'nombre',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<PerfilUsuario[]>;
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
    private _perfilUsuarioService: PerfilUsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.perfilUsuario;
    this.listarPerfilesUsuario();
  }

  listarPerfilesUsuario() {
    this._perfilUsuarioService.listarPerfilesUsuario().subscribe(
      (res) => {
        this.listaPerfilesUsuario = res;
        console.log('li',this.listaPerfilesUsuario);
        this.viewOptions = this.listaPerfilesUsuario.length > 0;
        this.dataSource = new MatTableDataSource<PerfilUsuario[]>(res);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
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

  eliminarPerfilUsuario(idPerfilUsuario: string) {
    this._perfilUsuarioService.eliminarPerfilUsuario(idPerfilUsuario).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, accion_mensaje.registro_correcto, {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
        if (result.id === 1) this.listarPerfilesUsuario();
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

  modificarPerfilUsuario(idPerfilUsuario: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        idPerfilUsuario: idPerfilUsuario,
        edit: edit,
      },
    };

    this._router.navigate(['/dashboard/agregar-perfil-usuario'], extras);
  }
}
