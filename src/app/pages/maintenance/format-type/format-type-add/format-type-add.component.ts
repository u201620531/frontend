import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatType } from 'src/app/interfaces/format-type';
import { SupportTable } from 'src/app/interfaces/support-table';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { FormatTypeService } from 'src/app/services/format-type.service';
import { SupportTableService } from 'src/app/services/support-table.service';

@Component({
  selector: 'app-format-type-add',
  templateUrl: './format-type-add.component.html',
  styleUrls: ['./format-type-add.component.css'],
})
export class FormatTypeAddComponent implements OnInit {
  form: FormGroup;
  listFormatTypes: FormatType[] = [];
  listSupportTables: SupportTable[] = [];
  IdFormatType: string = '';
  idType?: string[] = [];
  readonlyOption: boolean = false;
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
    private _FormatTypeService: FormatTypeService,
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
        this._FormatTypeService
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
      }
    });
  }

  loadSupportTable() {
    this.listSupportTables = this._supportTableService.getSupportTables('TTD');
  }

  getFormatType(id: string) {
    return this._FormatTypeService.getFormatTypeById(id);
  }

  addFormatType() {
    const creationUser = 'jlre';
    const FormatType: FormatType = {
      id: this.form.value.id,
      description: this.form.value.description,
      abbreviation: this.form.value.abbreviation,
      type: this.form.value.Ttype.toString(),
      status: 'A',
      creationDate: new Date().toLocaleDateString(),
      creationUser: creationUser,
    };

    try {
      if (this.edit) {
        console.log('edit');
        console.log(this.IdFormatType);
        console.log(FormatType);
        this._FormatTypeService.editFormatType(FormatType).subscribe(
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
        this._FormatTypeService.addFormatType(FormatType).subscribe(
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
    this._router.navigate(['/dashboard/format-type-list']);
  }

  deleteFormatType(): void {
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
        //this._FormatTypeService.deleteFormatType(0);
        this.back();
      }
    });
  }
}
