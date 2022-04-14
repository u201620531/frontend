import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportTable } from 'src/app/interfaces/support-table';
import { TransactionType } from 'src/app/interfaces/transaction-type';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { SupportTableService } from 'src/app/services/support-table.service';
import { TransactionTypeService } from 'src/app/services/transaction-type.service';

@Component({
  selector: 'app-transaction-type-add',
  templateUrl: './transaction-type-add.component.html',
  styleUrls: ['./transaction-type-add.component.css']
})
export class TransactionTypeAddComponent implements OnInit {
  form: FormGroup;
  listTransactionTypes: TransactionType[] = [];
  listSupportTables: SupportTable[] = [];
  IdTransactionType: string = '';
  idType?: string[] = [];
  readonlyOption: boolean = false;
  confirmation: boolean = false;

  constructor(
    private _TransactionTypeService: TransactionTypeService,
    private _supportTableService: SupportTableService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      Id: ['', Validators.required],
      Description: ['', Validators.required],
      Abbreviation: ['', Validators.required],
      Type: ['', Validators.required],
      State: [''],
    });
  }

  ngOnInit(): void {
    this.loadSupportTable();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdTransactionType = params['id'];
        const TransactionType: TransactionType[] = this.getTransactionType(
          this.IdTransactionType
        );
        this.idType = TransactionType[0].Type;
        this.form.setValue({
          Id: TransactionType[0].Id,
          Description: TransactionType[0].Description,
          Abbreviation: TransactionType[0].Abbreviation,
          Type: TransactionType[0].Type,
          State: TransactionType[0].State,
        });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadTransactionTypes() {
    this.listTransactionTypes = this._TransactionTypeService.getTransactionTypes();
  }

  loadSupportTable() {
    this.listSupportTables = this._supportTableService.getSupportTables('TTD');
  }

  getTransactionType(id: string) {
    return this._TransactionTypeService.getTransactionTypeById(id);
  }

  addTransactionType() {
    const TransactionType: TransactionType = {
      Id: this.form.value.Id,
      Description: this.form.value.Description,
      Abbreviation: this.form.value.Abbreviation,
      Type: this.form.value.Type,
      State: this.form.value.State,
      CreationDate: new Date().toLocaleDateString(),
      CreationUser: this.form.value.CreationUser,
    };

    this._TransactionTypeService.addTransactionType(TransactionType);
    this.back();
    this._snackBar.open('El Tipo de transacción fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  back() {
    this._router.navigate(['/dashboard/transaction-type-list']);
  }

  deleteTransactionType(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar al Tipo de transacción ${this.IdTransactionType}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        //this._TransactionTypeService.deleteTransactionType(0);
        this.back();
      }
    });
  }
}
