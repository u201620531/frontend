import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatType } from 'src/app/interfaces/format-type';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { FormatTypeService } from 'src/app/services/format-type.service';
import { SupportTableService } from 'src/app/services/support-table.service';
import { supportTables } from 'src/shared/config';

@Component({
  selector: 'app-format-type-add',
  templateUrl: './format-type-add.component.html',
  styleUrls: ['./format-type-add.component.css'],
})
export class FormatTypeAddComponent implements OnInit {
  form: FormGroup;
  listFormatTypes: FormatType[] = [];
  listSupportTables: any = [];
  IdFormatType: string = '';
  idType?: string[] = [];
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  delete: boolean = true;
  confirmation: boolean = false;
  formatType: FormatType = {
    id: '',
    description: '',
    abbreviation: '',
    status: 'A',
    type: [],
    creationDate: new Date().toLocaleDateString(),
    creationUser: '',
  };

  edit: boolean = false;

  constructor(
    private _formatTypeService: FormatTypeService,
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
    });
  }

  ngOnInit(): void {
    this.loadSupportTable();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdFormatType = params['id'];
        this.readonlyId = this.IdFormatType ? true : false;
        this._formatTypeService
          .getFormatTypeById(this.IdFormatType)
          .subscribe((res: any) => {
            const listTypes = res.type.split(',');
            this.idType = listTypes;
            this.form.setValue({
              id: res.id,
              description: res.description,
              abbreviation: res.abbreviation,
              type: listTypes,
              status: res.status,
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
      .getSupportTableById(supportTables.formatType)
      .subscribe((res) => {
        this.listSupportTables = res;
      });
  }

  getFormatType(id: string) {
    return this._formatTypeService.getFormatTypeById(id);
  }

  addFormatType() {
    const creationUser = 'jlre';
    const FormatType: FormatType = {
      id: this.form.value.id,
      description: this.form.value.description,
      abbreviation: this.form.value.abbreviation,
      type: this.form.value.type.toString(),
      status: 'A',
      creationDate: new Date().toLocaleDateString(),
      creationUser: creationUser,
    };

    if (this.edit) {
      this._formatTypeService
        .editFormatType(FormatType, FormatType.id)
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
    } else {
      this._formatTypeService.addFormatType(FormatType).subscribe(
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
  }

  back() {
    this._router.navigate(['/dashboard/format-type-list']);
  }

  deleteFormatType() {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar al Tipo de formato ${this.IdFormatType}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        this._formatTypeService.deleteFormatType(this.form.value.id).subscribe(
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
