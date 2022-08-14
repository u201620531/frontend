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
edit:boolean=false;
transactionType: TransactionType = {
  id: '',
  description: '',
  abbreviation: '',
  status: 'A',
  type: [],
  creationDate: new Date().toLocaleDateString(),
  creationUser: '',
};
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
      Status: [''],
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
        this._TransactionTypeService
          .getTransactionTypeById(this.IdTransactionType)
          .subscribe((res: any) => {
            const listTypes = res.type.split(',');
            this.idType = listTypes;
            this.form.setValue({
              Id: res.id,
              Description: res.description,
              Abbreviation: res.abbreviation,
              Type: listTypes,
              Status: res.status,
            });
            this.edit = true;
          });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadSupportTable() {
    this.listSupportTables = this._supportTableService.getSupportTables('TTD');
  }

  getTransactionType(id: string) {
    return this._TransactionTypeService.getTransactionTypeById(id);
  }

  addTransactionType() {
    const creationUser = 'jlre';
    const FormatType: TransactionType = {
      id: this.form.value.Id,
      description: this.form.value.Description,
      abbreviation: this.form.value.Abbreviation,
      type: this.form.value.Type.toString(),
      status: 'A',
      creationDate: new Date().toLocaleDateString(),
      creationUser: creationUser,
    };

    try {
      if (this.edit) {
        this._TransactionTypeService.editTransactionType(FormatType).subscribe(
          (res) => {
            const result: any = res;
            this.back();
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log('add');
        this._TransactionTypeService.addTransactionType(FormatType).subscribe(
          (res) => {
            const result: any = res;
            this.back();
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
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
