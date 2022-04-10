import { Component, OnInit } from '@angular/core';
import { DocumentType } from 'src/app/interfaces/document-type';
import { FormatType } from 'src/app/interfaces/format-type';
import { Money } from 'src/app/interfaces/money';
import { TransactionType } from 'src/app/interfaces/transaction-type';
import { WayPay } from 'src/app/interfaces/way-pay';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { FormatTypeService } from 'src/app/services/format-type.service';
import { MoneyService } from 'src/app/services/money.service';
import { TransactionTypeService } from 'src/app/services/transaction-type.service';
import { WayPayService } from 'src/app/services/way-pay.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  listDocumentTypes: DocumentType[] = [];
  listTransactionTypes: TransactionType[] = [];
  listFormatTypes: FormatType[] = [];
  listMoneys: Money[] = [];
  listWayPays: WayPay[] = [];

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _transactionTypeService: TransactionTypeService,
    private _formatTypeService: FormatTypeService,
    private _moneyService: MoneyService,
    private _wayPayService: WayPayService,
    //private _electronicDocumentsService: ElectronicDocumentsService,
    ) { }

  ngOnInit(): void {
    this.loadTransactionType();
    this.loadDocumentType();
    this.loadMoney();
    this.loadWayPay();
    this.loadFormatType();
  }

  loadDocumentType() {
    this.listDocumentTypes = this._documentTypeService.getDocumentTypes();
  }

  loadTransactionType() {
    this.listTransactionTypes = this._transactionTypeService.getReportTransactionTypes();
  }

  loadFormatType() {
    this.listFormatTypes = this._formatTypeService.getFormatTypes();
  }

  loadMoney() {
    this.listMoneys = this._moneyService.getMoneys();
  }

  loadWayPay() {
    this.listWayPays = this._wayPayService.getWayPays();
  }

  cleanFilters(): void {

  }
}
