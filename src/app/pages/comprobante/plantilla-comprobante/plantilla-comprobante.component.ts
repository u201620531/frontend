import { SelectionModel } from '@angular/cdk/collections';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CuentaContable } from 'src/app/interfaces/cuenta-contable';
import { DetallePlantillaComprobante } from 'src/app/interfaces/detalle-plantilla-comprobante';
import { PlantillaComprobante } from 'src/app/interfaces/plantilla-comprobante';
import { PlantillaCONCAR } from 'src/app/interfaces/plantilla-concar';
import { SubCuentaContable } from 'src/app/interfaces/sub-cuenta-contable';
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { DetallePlantillaComprobanteService } from 'src/app/services/detalle-plantilla-comprobante.service';
import { PlantillaComprobanteService } from 'src/app/services/plantilla-comprobante.service';
import { SubCuentaContableService } from 'src/app/services/sub-cuenta-contable.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  accion_mensaje,
  estado_inicial,
  filters,
  plantilla_CONCAR,
} from 'src/shared/config';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-plantilla-comprobante',
  templateUrl: './plantilla-comprobante.component.html',
  styleUrls: ['./plantilla-comprobante.component.css'],
})
export class PlantillaComprobanteComponent implements OnInit {
  form: FormGroup;
  listaDetallePlantillaComprobante: DetallePlantillaComprobanteService[] = [];
  displayedColumns: string[] = [
    'select',
    'idPlantillaComprobante',
    'serie',
    'correlativo',
    'nroDocumento',
    'razonSocial',
    'fechaEmision',
    'formaPago',
    'importeTotal',
    'estado',
    //    'acciones',
  ];
  dataSource!: MatTableDataSource<DetallePlantillaComprobante>;
  placeholderValue: string = '';
  idPlantillaComprobante: string = '';
  plantillaCONCAR: PlantillaCONCAR[] = [];
  private paginator!: MatPaginator;
  private sort: MatSort;
  modificar: boolean = false;
  eliminar: boolean = true;
  loading: boolean = true;
  readonlyOption: boolean = false;
  plantillaRegistro: PlantillaComprobante = {
    idPlantillaComprobante: '',
    nroTicketEnvio: '',
    fechaDeclaracion: '',
    observacion: '',
    fechaCreacion: '',
    estado: '',
    usuarioCreacion: '',
  };
  detallePlantillaRegistro: DetallePlantillaComprobante[] = [];
  validaRegistro: boolean = false;
  nroTicketEnvio: string = '';
  fechaDeclaracion: string = '';
  onseervaciones: string = '';

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
    private _detallePlantillaComprobanteService: DetallePlantillaComprobanteService,
    private _usuarioService: UsuarioService,
    private _cuentaContableService: CuentaContableService,
    private _subCuentaContableService: SubCuentaContableService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({
      idPlantillaComprobante: ['', Validators.required],
      nroTicketEnvio: [''],
      fechaDeclaracion: [''],
      observacion: [''],
      estado: [''],
      fechaCreacion: [''],
      usuarioCreacion: [''],
    });
  }

  selection = new SelectionModel<DetallePlantillaComprobante>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  listaSubCuentasContables: SubCuentaContable[] = [];
  listaCuentasContables: CuentaContable[] = [];

  ngOnInit(): void {
    this.listarCuentasContables();
    this.listarSubCuentasContables();
    this.placeholderValue = filters.placeholders.plantilla;
    this.listarDetallePlantilla();
  }

  async listarSubCuentasContables() {
    this._subCuentaContableService.listarSubCuentasContables().subscribe(
      (res) => {
        this.listaSubCuentasContables = res;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  async listarCuentasContables() {
    this._cuentaContableService.listarCuentasContables().subscribe(
      (res) => {
        this.listaCuentasContables = res;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  listarDetallePlantilla() {
    this._route.queryParams.subscribe((params) => {
      if (params && params['idPlantillaComprobante'])
        this.idPlantillaComprobante = params['idPlantillaComprobante'];
      else this.idPlantillaComprobante = '0';
      this._detallePlantillaComprobanteService
        .listarDetallePlantillaComprobante(this.idPlantillaComprobante)
        .subscribe((res: any) => {
          this.listaDetallePlantillaComprobante = res;
          this.dataSource =
            new MatTableDataSource<DetallePlantillaComprobante>();
          this.dataSource.data = res;
          this.loading = false;
          // this.modificar = true;
        });
      if (params && params['modificar']) {
        this.readonlyOption = params['modificar'] !== '1' ? true : false;
        this.eliminar = params['modificar'] !== '1' ? true : false;
      }
    });
    console.log('readonlyOption',this.readonlyOption);
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
          if (result.id === 1) this.back();
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

  eliminarDetallePlantillaComprobante(
    idPlantillaComprobante: string,
    idComprobante: string
  ) {
    this._detallePlantillaComprobanteService
      .eliminarDetallePlantillaComprobante(
        idPlantillaComprobante,
        idComprobante
      )
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
          if (result.id === 1) this.listarDetallePlantilla();
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

  asignarValoresPlantilla() {
    this.plantillaCONCAR = [];
    const fechaActual = new Date();
    const nro_Comprobante = (fechaActual.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    let _correlativo = 0;
    let plantilla: any;
    this.validaRegistro = false;
    let detalleRegistro: DetallePlantillaComprobante = {
      idComprobante: '',
      idPlantillaComprobante: '',
      detalle: '',
      estado: '',
    };
    this.listaDetallePlantillaComprobante.forEach((_comprobante: any) => {
      if (_comprobante.select === '1') {
        detalleRegistro = {
          idComprobante: '',
          idPlantillaComprobante: '',
          detalle: '',
          estado: '',
        };
        plantilla = {};
        _correlativo += 1;
        plantilla.Sub_Diario = '';
        plantilla.Número_de_Comprobante =
          nro_Comprobante + _correlativo.toString().padStart(4, '0');
        plantilla.Fecha_de_Comprobante = _comprobante.fechaEmision;
        plantilla.Código_de_Moneda = 'PEN';
        plantilla.Glosa_Principal = '';
        plantilla.Tipo_de_Cambio = '0.00';
        plantilla.Tipo_de_Conversión = 'M';
        plantilla.Flag_de_Conversión_de_Moneda = 'N';
        plantilla.Fecha_Tipo_de_Cambio = '';
        plantilla.Cuenta_Contable =
          this.listaCuentasContables[0].idCuentaContable;
        plantilla.Código_de_Anexo =
          this.listaSubCuentasContables[0].idSubCuentaContable;
        plantilla.Código_de_Centro_de_Costo = '000000';
        plantilla.Debe_____Haber = 'D';
        plantilla.Importe_Original = _comprobante.importeTotal;
        plantilla.Importe_en_Dólares = '';
        plantilla.Importe_en_Soles = 0.0;
        plantilla.Tipo_de_Documento = 'FE';
        plantilla.Número_de_Documento =
          _comprobante.serie + '-' + _comprobante.correlativo;
        plantilla.Fecha_de_Documento = '';
        plantilla.Fecha_de_Vencimiento = '';
        plantilla.Código_de_Area = '';
        plantilla.Glosa_Detalle = '';
        plantilla.Código_de_Anexo_Auxiliar = '';
        plantilla.Medio_de_Pago = '';
        plantilla.Tipo_de_Documento_de_Referencia = '';
        plantilla.Número_de_Documento_Referencia = '';
        plantilla.Fecha_Documento_Referencia = '';
        plantilla.Nro_Máq__Registradora_Tipo_Doc__Ref_ = '';
        plantilla.Base_Imponible_Documento_Referencia = '';
        plantilla.IGV_Documento_Provisión = '';
        plantilla.Tipo_Referencia_en_estado_MQ = '';
        plantilla.Número_Serie_Caja_Registradora = '';
        plantilla.Fecha_de_Operación = '';
        plantilla.Tipo_de_Tasa = '';
        plantilla.Tasa_Detracción_____Percepción = '';
        plantilla.Importe_Base_Detracción_____Percepción_Dólares = '';
        plantilla.Importe_Base_Detracción_____Percepción_Soles = '';
        plantilla.Tipo_Cambio_para_____F___ = '';
        plantilla.Importe_de_IGV_sin_derecho_crédito_fiscal = '';
        this.plantillaCONCAR.push(plantilla);
        //Detalle
        detalleRegistro.idComprobante = _comprobante.idComprobante;
        detalleRegistro.estado = estado_inicial;
        this.detallePlantillaRegistro.push(detalleRegistro);
        this.validaRegistro = true;
      }
    });
  }

  async generarPlantilla() {
    this.descargarPlantilla();
    if (this.validaRegistro) this.registrarPlantilla();
  }

  async descargarPlantilla() {
    this.asignarValoresPlantilla();
    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(wb, plantilla_CONCAR.campos);

    const ws = XLSX.utils.sheet_add_json(wb, this.plantillaCONCAR, {
      origin: 'A2',
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, 'compr');
    XLSX.writeFile(wb, plantilla_CONCAR.nombre_archivo + '.xlsx');
  }

  async registrarPlantilla() {
    //Asignar valores cabecera
    this.plantillaRegistro.idPlantillaComprobante = '';
    this.plantillaRegistro.nroTicketEnvio = '';
    this.plantillaRegistro.fechaDeclaracion = '';
    this.plantillaRegistro.observacion = '';
    this.plantillaRegistro.estado = this.modificar
      ? this.form.value.estado
      : estado_inicial;
    this.plantillaRegistro.fechaCreacion = this.modificar
      ? this.form.value.fechaCreacion
      : new Date().toLocaleDateString();
    this.plantillaRegistro.usuarioCreacion = this.modificar
      ? this.form.value.usuarioCreacion
      : this._usuarioService.currentUsuarioValue.codigoUsuario;
    if (this.modificar) {
      this._plantillaComprobanteService
        .actualizarPlantillaComprobante(
          this.plantillaRegistro,
          this.plantillaRegistro.idPlantillaComprobante
        )
        .subscribe(
          (res) => {
            const result: any = res;
            if (result.id === 1) this.back();
            this._snackBar.open(
              result.message,
              accion_mensaje.registro_correcto,
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000,
              }
            );
          },
          (err) => {
            this._snackBar.open(err.message, accion_mensaje.error_tecnico, {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
          }
        );
    } else {
      this._plantillaComprobanteService
        .agregarPlantillaComprobante(this.plantillaRegistro)
        .subscribe(
          (res) => {
            const result: any = res;
            this.idPlantillaComprobante = result.detail;
            this.registrarDetalle(this.idPlantillaComprobante);
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
  }

  registrarDetalle(idPlantilla: string) {
    console.log('id', idPlantilla);
    let error_detalle = '';
    this.detallePlantillaRegistro.forEach((element) => {
      element.idPlantillaComprobante = idPlantilla;
      console.log('element', element);
      this._detallePlantillaComprobanteService
        .agregarDetallePlantillaComprobante(element)
        .subscribe(
          (res) => {
            const result: any = res;
          },
          (err) => {
            error_detalle = err.message;
          }
        );
    });
    if (error_detalle === '') {
      this._snackBar.open('Registro Ok', accion_mensaje.registro_correcto, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
      this.back();
    } else {
      this._snackBar.open(error_detalle, accion_mensaje.error_tecnico, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }
  }

  back() {
    this._router.navigate(['/dashboard/plantilla-comprobante']);
  }

  selectRow(serie: string, correlativo: string) {
    this.listaDetallePlantillaComprobante.map((_comprobante: any) => {
      if (
        _comprobante.serie === serie &&
        _comprobante.correlativo === correlativo
      )
        _comprobante.select = _comprobante.select === '1' ? '' : '1';
    });
  }
}
