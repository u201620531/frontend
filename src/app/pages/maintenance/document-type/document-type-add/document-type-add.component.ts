import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentType } from 'src/app/interfaces/document-type';
import { SupportTable } from 'src/app/interfaces/support-table';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { SupportTableService } from 'src/app/services/support-table.service';

@Component({
  selector: 'app-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.css']
})
export class DocumentTypeAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listSupportTables: SupportTable[] = [];
  IdDocumentType: string = '';
  idType: string | undefined = '';
  readonlyOption: boolean = false;
  confirmation: boolean= false;

  constructor(
    private _documentTypeService: DocumentTypeService,
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
        this.IdDocumentType = params['id'];
        const documentType: DocumentType[] = this.getDocumentType(this.IdDocumentType);
        this.idType = documentType[0].Type;
        this.form.setValue({
          Id: documentType[0].Id,
          Description: documentType[0].Description,
          Abbreviation: documentType[0].Abbreviation,
          Type: documentType[0].Type,
          State: documentType[0].State,
        });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadDocumentTypes() {
    this.listDocumentTypes = this._documentTypeService.getDocumentTypes();
  }

  loadSupportTable() {
    this.listSupportTables = this._supportTableService.getSupportTables('TTD');
  }

  getDocumentType(id: string) {
    return this._documentTypeService.getDocumentTypeById(id);
  }

  addDocumentType() {
    const documentType: DocumentType = {
      Id: this.form.value.Id,
      Description: this.form.value.Description,
      Abbreviation: this.form.value.Abbreviation,
      Type: this.form.value.Type,
      State: this.form.value.State,
      CreationDate: new Date().toLocaleDateString(),
      CreationUser: this.form.value.CreationUser,
    };

    this._documentTypeService.addDocumentType(documentType);
    this._router.navigate(['/dashboard/maintenance/document-type/document-type-list']);

    this._snackBar.open('El Tipo de documento fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  back() {
    this._router.navigate(['/dashboard/maintenance/document-type/document-type-list']);
  }

  deleteDocumentType(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar al Tipo de documento ${this.IdDocumentType}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        //this._DocumentTypeService.deleteDocumentType(0);
        this.back();
      }
    });
  }
}
