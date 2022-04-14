import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        this.IdFormatType = params['id'];
        const FormatType: FormatType[] = this.getFormatType(this.IdFormatType);
        this.idType = FormatType[0].Type;
        this.form.setValue({
          Id: FormatType[0].Id,
          Description: FormatType[0].Description,
          Abbreviation: FormatType[0].Abbreviation,
          Type: FormatType[0].Type,
          State: FormatType[0].State,
        });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadFormatTypes() {
    this.listFormatTypes = this._FormatTypeService.getFormatTypes();
  }

  loadSupportTable() {
    this.listSupportTables = this._supportTableService.getSupportTables('TTD');
  }

  getFormatType(id: string) {
    return this._FormatTypeService.getFormatTypeById(id);
  }

  addFormatType() {
    const FormatType: FormatType = {
      Id: this.form.value.Id,
      Description: this.form.value.Description,
      Abbreviation: this.form.value.Abbreviation,
      Type: this.form.value.Type,
      State: this.form.value.State,
      CreationDate: new Date().toLocaleDateString(),
      CreationUser: this.form.value.CreationUser,
    };

    this._FormatTypeService.addFormatType(FormatType);
    this.back();
    this._snackBar.open('El Tipo de formato fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
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
