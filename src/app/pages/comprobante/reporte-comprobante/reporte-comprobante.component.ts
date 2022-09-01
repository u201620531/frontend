import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { Moneda } from 'src/app/interfaces/moneda';
import { FormaPago } from 'src/app/interfaces/forma-pago';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
@Component({
  selector: 'app-reporte-comprobante',
  templateUrl: './reporte-comprobante.component.html',
  styleUrls: ['./reporte-comprobante.component.css'],
})
export class ReporteComprobanteComponent implements OnInit {
  listaTipoDocumento: TipoDocumento[] = [];
  listaMoneda: Moneda[] = [];
  listaFormaPago: FormaPago[] = [];
  rangeDates = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private _tipoDocumentoService: TipoDocumentoService,
    private _monedaService: MonedaService,
    private _formaPagoService: FormaPagoService //private _electronicDocumentsService: ElectronicDocumentsService,
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
}
