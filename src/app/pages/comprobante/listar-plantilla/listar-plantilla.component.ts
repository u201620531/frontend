import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { PlantillaComprobante } from 'src/app/interfaces/plantilla-comprobante';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { PlantillaComprobanteService } from 'src/app/services/plantilla-comprobante.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { accion_mensaje, auditoriaLog, filters } from 'src/shared/config';
import { CustomPaginator } from '../../shared/CustomPaginatorConfiguration';

@Component({
  selector: 'app-listar-plantilla',
  templateUrl: './listar-plantilla.component.html',
  styleUrls: ['./listar-plantilla.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ListarPlantillaComponent implements OnInit {
  listaPlantillaComprobante: PlantillaComprobante[] = [];
  displayedColumns: string[] = [
    'idPlantillaComprobante',
    'nroTicket',
    'fechaCreacion',
    'fechaDeclaracion',
    'observacion',
    'estado',
    'acciones',
  ];
  dataSource!: MatTableDataSource<PlantillaComprobante>;
  placeholderValue: string = '';
  private paginator!: MatPaginator;
  private sort: MatSort;
  loading: boolean = true;
  auditoria: any = {};

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
    private _plantillaComprobanteService: PlantillaComprobanteService,
    private _auditoriaService: AuditoriaService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.plantilla;
    this.listarPlantillas();
  }

  listarPlantillas() {
    this._plantillaComprobanteService.listarPlantillaComprobante().subscribe(
      (res) => {
        this.listaPlantillaComprobante = res;
        this.dataSource = new MatTableDataSource<PlantillaComprobante>();
        this.dataSource.data = res;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.auditoria = {
          fecha: new Date(),
          opcion: auditoriaLog.opciones.comprobante_plantilla_listar,
          proceso: auditoriaLog.procesos.listar + ' plantillas',
          codigoError: err.id,
          mensageError: err.message,
          detalleError: err.detail,
          codigoUsuario: this._usuarioService.currentUsuarioValue.codigoUsuario,
        };
        this._auditoriaService
          .agregarAuditoria(this.auditoria)
          .subscribe((res) => {});

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

  eliminarPlantillaComprobante(idPlantillaComprobante: string) {
    this._plantillaComprobanteService
      .eliminarPlantillaComprobante(idPlantillaComprobante)
      .subscribe(
        (res) => {
          const result: any = res;
          this._snackBar.open(
            result.message,
            accion_mensaje.registro_correcto,
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            }
          );
          if (result.id === 1) this.listarPlantillas();
        },
        (err) => {
          this.auditoria = {
            fecha: new Date(),
            opcion: auditoriaLog.opciones.comprobante_plantilla_listar,
            proceso: auditoriaLog.procesos.eliminar + ' plantilla',
            codigoError: err.id,
            mensageError: err.message,
            detalleError: err.detail,
            codigoUsuario:
              this._usuarioService.currentUsuarioValue.codigoUsuario,
          };
          this._auditoriaService
            .agregarAuditoria(this.auditoria)
            .subscribe((res) => {});

          this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
          });
        }
      );
  }

  modificarPlantillaComprobante(
    idPlantillaComprobante: string,
    modificar: number
  ): void {
    const extras: NavigationExtras = {
      queryParams: {
        idPlantillaComprobante: idPlantillaComprobante,
        modificar: modificar,
      },
    };

    this._router.navigate(['/dashboard/agregar-plantilla-comprobante'], extras);
  }
}
