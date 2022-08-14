import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { DocumentType } from 'src/app/interfaces/document-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElectronicDocuments } from 'src/app/interfaces/electronic-documents';
import { ElectronicDocumentsService } from 'src/app/services/electronic-documents.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionType } from 'src/app/interfaces/transaction-type';
import { TransactionTypeService } from 'src/app/services/transaction-type.service';
import { FormatTypeService } from 'src/app/services/format-type.service';
import { MoneyService } from 'src/app/services/money.service';
import { FormatType } from 'src/app/interfaces/format-type';
import { Money } from 'src/app/interfaces/money';
import { WayPayService } from 'src/app/services/way-pay.service';
import { WayPay } from 'src/app/interfaces/way-pay';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listTransactionTypes: any = [];
  listFormatTypes: FormatType[] = [];
  listMoneys: Money[] = [];
  listWayPays: WayPay[] = [];
  transactionTypeId: string = '';

  subscription = new Subscription();
  typeList: any = [{}];

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _transactionTypeService: TransactionTypeService,
    private _formatTypeService: FormatTypeService,
    private _moneyService: MoneyService,
    private _wayPayService: WayPayService,
    private _electronicDocumentsService: ElectronicDocumentsService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this._formBuilder.group({
      Serie: ['', Validators.required],
      Number: ['', Validators.required],
      TransactionType: ['', Validators.required],
      Customer: ['', Validators.required],
      Supplier: ['', Validators.required],
      DocumentType: ['', Validators.required],
      FormatType: ['', Validators.required],
      WayPay: ['', Validators.required],
      Total: ['', Validators.required],
      Money: ['', Validators.required],
      State: ['', Validators.required],
      ScanDate: ['', Validators.required],
      ScanUser: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTransactionType();
    this.loadDocumentType();
    this.loadMoney();
    this.loadWayPay();
    this.loadFormatType();
  }

  loadDocumentType() {
    this._documentTypeService.getDocumentTypes().subscribe((res) => {
      this.listDocumentTypes = res;
    });
  }

  loadTransactionType() {
    this._transactionTypeService.getTransactionTypes().subscribe(
      (res) => {
        this.listTransactionTypes = res;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  loadFormatType() {
    this.subscription.add(
      this._formatTypeService.getFormatTypes().subscribe((res) => {
        console.log(res);
        this.listFormatTypes = res;
        console.log(this.listFormatTypes);
      })
    );
    //this.listFormatTypes = this._formatTypeService.getFormatTypes();
  }

  loadMoney() {
    this.listMoneys = this._moneyService.getMoneys();
  }

  loadWayPay() {
    this._wayPayService.getWayPays().subscribe((res) => {
      this.listWayPays = res;
    });
  }

  addElectronicDocument() {
    const electronicDocument: ElectronicDocuments = {
      Id: this.form.value.Id,
      Serie: this.form.value.Serie,
      Number: this.form.value.Number,
      Customer: this.form.value.Customer,
      Supplier: this.form.value.Supplier,
      DocumentType: this.form.value.DocumentType,
      TransactionType: this.form.value.TransactionType,
      FormatType: this.form.value.FormatType,
      WayPay: this.form.value.WayPay,
      Total: this.form.value.Total,
      Money: this.form.value.Money,
      State: this.form.value.State,
      ScanDate: this.form.value.ScanDate,
      ScanUser: this.form.value.ScanUser,
    };

    this._electronicDocumentsService.addDocumentTypes(electronicDocument);
    this.router.navigate(['/dashboard/electronic-documents-list']);

    this._snackBar.open(
      'El Comprobante electrónico fue registrado con éxito.',
      '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1500,
      }
    );
  }
}
