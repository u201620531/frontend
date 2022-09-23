import { SelectionModel } from '@angular/cdk/collections';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DetallePlantillaComprobante } from 'src/app/interfaces/detalle-plantilla-comprobante';
import { PlantillaCONCAR } from 'src/app/interfaces/plantilla-concar';
import { DetallePlantillaComprobanteService } from 'src/app/services/detalle-plantilla-comprobante.service';
import { PlantillaComprobanteService } from 'src/app/services/plantilla-comprobante.service';
import { accion_mensaje, filters, plantilla_CONCAR } from 'src/shared/config';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-plantilla-comprobante',
  templateUrl: './plantilla-comprobante.component.html',
  styleUrls: ['./plantilla-comprobante.component.css'],
})
export class PlantillaComprobanteComponent implements OnInit {
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
  viewOptions: boolean = true;
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
    private _plantillaComprobanteService: PlantillaComprobanteService,
    private _detallePlantillaComprobanteService: DetallePlantillaComprobanteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  selection = new SelectionModel<DetallePlantillaComprobante>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.plantilla;
    this.listarDetallePlantilla();
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
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  generarPlantilla() {
    this.plantillaCONCAR = [];
    const fechaActual = new Date();
    const nro_Comprobante = (fechaActual.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    let _correlativo = 0;
    let plantilla: any;
    this.listaDetallePlantillaComprobante.forEach((_comprobante: any) => {
      if (_comprobante.select === '1') {
        plantilla = {};
        _correlativo += 1;
        plantilla.Sub_Diario = '';
        plantilla.Número_de_Comprobante =
          nro_Comprobante + _correlativo.toString().padStart(4, '0');
        plantilla.Fecha_de_Comprobante = _comprobante.fechaEmision;
        plantilla.Código_de_Moneda = 'NS';
        plantilla.Glosa_Principal = '';
        plantilla.Tipo_de_Cambio = '0.00';
        plantilla.Tipo_de_Conversión = 'M';
        plantilla.Flag_de_Conversión_de_Moneda = 'N';
        plantilla.Fecha_Tipo_de_Cambio = '';
        plantilla.Cuenta_Contable = '00000000';
        plantilla.Código_de_Anexo = '000000000000000000';
        plantilla.Código_de_Centro_de_Costo = '000000';
        plantilla.Debe_____Haber = 'D';
        plantilla.Importe_Original = 0.0;
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
      }
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(wb, plantilla_CONCAR.campos);

    const ws = XLSX.utils.sheet_add_json(wb, this.plantillaCONCAR, {
      origin: 'A2',
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, 'compr');
    XLSX.writeFile(wb, plantilla_CONCAR.nombre_archivo + '.xlsx');
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
