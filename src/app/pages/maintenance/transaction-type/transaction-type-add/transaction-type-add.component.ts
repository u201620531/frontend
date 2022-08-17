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
import { supportTables } from 'src/shared/config';

@Component({
  selector: 'app-transaction-type-add',
  templateUrl: './transaction-type-add.component.html',
  styleUrls: ['./transaction-type-add.component.css'],
})
export class TransactionTypeAddComponent implements OnInit {
  form: FormGroup;
  listTransactionTypes: TransactionType[] = [];
  listSupportTables: any = [];
  IdTransactionType: string = '';
  idType?: string[] = [];
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  delete: boolean = true;
  confirmation: boolean = false;
  edit: boolean = false;
  constructor(
    private _transactionTypeService: TransactionTypeService,
    private _supportTableService: SupportTableService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      abbreviation: ['', Validators.required],
      type: ['', Validators.required],
      status: [''],
      creationDate: [''],
      creationUser: [''],
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
        this.readonlyId = this.IdTransactionType ? true : false;
        this._transactionTypeService
          .getTransactionTypeById(this.IdTransactionType)
          .subscribe((res: any) => {
            const listTypes = res.type.split(',');
            this.idType = listTypes;
            this.form.setValue({
              id: res.id,
              description: res.description,
              abbreviation: res.abbreviation,
              type: listTypes,
              status: res.status,
              creationDate: res.creationDate,
              creationUser: res.creationUser,
            });
            this.edit = true;
          });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
        this.delete = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadSupportTable() {
    this._supportTableService
      .getSupportTableById(supportTables.transactionType)
      .subscribe((res) => {
        this.listSupportTables = res;
      });
  }

  getTransactionType(id: string) {
    return this._transactionTypeService.getTransactionTypeById(id);
  }

  addTransactionType() {
    const creationUser = 'jlre';
    const transactionType: TransactionType = {
      id: this.form.value.id,
      description: this.form.value.description,
      abbreviation: this.form.value.abbreviation,
      type: this.form.value.type.toString(),
      status: 'A',
      creationDate: new Date().toLocaleDateString(),
      creationUser: creationUser,
    };

    if (this.edit) {
      this._transactionTypeService
        .editTransactionType(transactionType, transactionType.id)
        .subscribe(
          (res) => {
            const result: any = res;
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
            if (result.id === 1) this.back();
          },
          (err) => {
            this._snackBar.open(err.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          }
        );
    } else {
      this._transactionTypeService
        .addTransactionType(transactionType)
        .subscribe(
          (res) => {
            const result: any = res;
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
            if (result.id === 1) this.back();
          },
          (err) => {
            this._snackBar.open(err.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          }
        );
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
        this._transactionTypeService
          .deleteTransactionType(this.form.value.id)
          .subscribe(
            (res) => {
              const result: any = res;
              if (result.id === 1) this.back();
              this._snackBar.open(result.message, '', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 1500,
              });
            },
            (err) => {
              this._snackBar.open(err.message, '', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 1500,
              });
            }
          );
      }
    });
  }
}
