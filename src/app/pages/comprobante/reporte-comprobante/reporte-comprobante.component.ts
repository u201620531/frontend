import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { Moneda } from 'src/app/interfaces/moneda';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { Comprobante } from 'src/app/interfaces/comprobante';
import * as XLSX from 'xlsx-js-style';
import { accion_mensaje, reportes, soporte } from 'src/shared/config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SoporteService } from 'src/app/services/soporte.service';
import { formatoFechaGuion } from 'src/shared/functions';

@Component({
  selector: 'app-reporte-comprobante',
  templateUrl: './reporte-comprobante.component.html',
  styleUrls: ['./reporte-comprobante.component.css'],
})
export class ReporteComprobanteComponent implements OnInit {
  listaTipoDocumento: TipoDocumento[] = [];
  listaMoneda: Moneda[] = [];
  listaFormaPago: FormaPago[] = [];
  listaEstados: any = [];
  listaComprobantes: Comprobante[] = [];
  rangeDates = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  resetRange() {
    this.rangeDates.patchValue({
      start: null,
      end: null,
    });
  }

  nroDocumento: string = '';
  idTipoDocumento: string = '';
  idFormaPago: string = '';
  idMoneda: string = '';
  fechaEmisionIni: string = '';
  fechaEmisionFin: string = '';
  estado: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private _tipoDocumentoService: TipoDocumentoService,
    private _monedaService: MonedaService,
    private _formaPagoService: FormaPagoService,
    private _comprobanteService: ComprobanteService,
    private _soporteService: SoporteService
  ) {}

  ngOnInit(): void {
    this.listarFormasPago();
    this.listarMonedas();
    this.listarTiposDocumento();
    this.listarEstados();
  }

  listarTiposDocumento() {
    this._tipoDocumentoService.listarTipoDocumento().subscribe((res) => {
      this.listaTipoDocumento = res;
    });
  }

  listarMonedas() {
    this._monedaService.listarMonedas().subscribe((res) => {
      this.listaMoneda = res;
    });
  }

  listarFormasPago() {
    this._formaPagoService.listarFormaPago().subscribe((res) => {
      this.listaFormaPago = res;
    });
  }

  listarEstados() {
    this._soporteService
      .listarSoporteById(soporte.estadoComprobanteElectronico)
      .subscribe((res) => {
        this.listaEstados = res;
      });
  }

  cleanFilters(): void {
    this.resetRange();
    this.idMoneda='';
    this.idTipoDocumento='';
    this.idFormaPago='';
    this.estado='';
  }

  async descargarReporte() {
    this._comprobanteService
      .reporteComprobante(
        this.nroDocumento === '' ? 'X' : this.nroDocumento,
        this.idTipoDocumento === '' ? 'X' : this.idTipoDocumento,
        this.idFormaPago === '' ? 'X' : this.idFormaPago,
        this.idMoneda === '' ? 'X' : this.idMoneda,
        this.rangeDates.value.start === ''
          ? 'X'
          : this.rangeDates.value.start !== null
          ? formatoFechaGuion(this.rangeDates.value.start)
          : this.rangeDates.value.start,
        this.rangeDates.value.end === ''
          ? 'X'
          : this.rangeDates.value.end !== null
          ? formatoFechaGuion(this.rangeDates.value.end)
          : this.rangeDates.value.end,
        this.estado === '' ? 'X' : this.estado
      )
      .subscribe(
        (res) => {
          this.listaComprobantes = res;
          if (this.listaComprobantes.length === 0) {
            this._snackBar.open('Consulta Ok', accion_mensaje.listado_vacio, {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000,
            });
          } else this.generarReporte();
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  styleHeader = {
    font: {
      bold: true,
      color: { rgb: 'FFFFFF' },
      name: 'Arial',
      sz: 10,
      alignment: { wrapText: true },
    },
    fill: {
      fgColor: { rgb: '1212C6' },
    },
  };

  async generarReporte() {
    const wb = XLSX.utils.book_new();

    let ws = XLSX.utils.json_to_sheet(this.listaComprobantes);
    ws['A1'].s = this.styleHeader;
    ws['B1'].s = this.styleHeader;
    ws['C1'].s = this.styleHeader;
    ws['D1'].s = this.styleHeader;
    ws['E1'].s = this.styleHeader;
    ws['F1'].s = this.styleHeader;
    ws['G1'].s = this.styleHeader;
    ws['H1'].s = this.styleHeader;
    ws['I1'].s = this.styleHeader;
    ws['J1'].s = this.styleHeader;

    ws['!cols'] = reportes.comprobante_electronico.columnasAncho;

    XLSX.utils.book_append_sheet(wb, ws, 'compr');
    const fechaActual = new Date()
      .toLocaleString()
      .replace(',', '')
      .replace(' ', '')
      .replace('/', '')
      .replace('/', '')
      .replace(':', '')
      .replace(':', '');
    XLSX.writeFile(
      wb,
      reportes.comprobante_electronico.nombre + '_' + fechaActual + '.xlsx'
    );
  }
}
