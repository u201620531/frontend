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
import { reportes } from 'src/shared/config';

@Component({
  selector: 'app-reporte-comprobante',
  templateUrl: './reporte-comprobante.component.html',
  styleUrls: ['./reporte-comprobante.component.css'],
})
export class ReporteComprobanteComponent implements OnInit {
  listaTipoDocumento: TipoDocumento[] = [];
  listaMoneda: Moneda[] = [];
  listaFormaPago: FormaPago[] = [];
  listaComprobantes: Comprobante[] = [];
  // rangeDates = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl(),
  // });

  nroDocumento: string = '';
  idTipoDocumento: string = '';
  idFormaPago: string = '';
  idMoneda: string = '';
  fechaEmisionIni: string = '';
  fechaEmisionFin: string = '';

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _monedaService: MonedaService,
    private _formaPagoService: FormaPagoService,
    private _comprobanteService: ComprobanteService
  ) {}

  ngOnInit(): void {
    this.listarFormasPago();
    this.listarMonedas();
    this.listarTiposDocumento();
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

  cleanFilters(): void {}

  async descargarReporte() {
    this._comprobanteService
      .reporteComprobante(
        this.nroDocumento === '' ? 'X' : this.nroDocumento,
        this.idTipoDocumento === '' ? 'X' : this.idTipoDocumento,
        this.idFormaPago === '' ? 'X' : this.idFormaPago,
        this.idMoneda === '' ? 'X' : this.idMoneda,
        this.fechaEmisionIni === '' ? 'X' : this.fechaEmisionIni,
        this.fechaEmisionFin === '' ? 'X' : this.fechaEmisionFin
      )
      .subscribe(
        (res) => {
          this.listaComprobantes = res;
          this.generarReporte();
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
