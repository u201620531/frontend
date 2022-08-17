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
import { supportTables } from 'src/shared/config';

@Component({
  selector: 'app-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.css'],
})
export class DocumentTypeAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listSupportTables: any = [];
  IdDocumentType: string = '';
  idType?: string[] = [];
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  delete: boolean = true;
  confirmation: boolean = false;
  edit: boolean = false;

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
        this.IdDocumentType = params['id'];
        this.readonlyId = this.IdDocumentType ? true : false;
        this._documentTypeService
          .getDocumentTypeById(this.IdDocumentType)
          .subscribe((res: any) => {
            const listTypes = res.type.split(',');
            this.idType = listTypes;
            this.form.setValue({
              id: res.id,
              description: res.description,
              abbreviation: res.abbreviation,
              status: res.status,
              type: listTypes,
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
      .getSupportTableById(supportTables.documentType)
      .subscribe((res) => {
        this.listSupportTables = res;
      });
  }

  getDocumentType(id: string) {
    return this._documentTypeService.getDocumentTypeById(id);
  }

  addDocumentType() {
    const creationUser = 'jlre';
    const documentType: DocumentType = {
      id: this.form.value.id,
      description: this.form.value.description,
      abbreviation: this.form.value.abbreviation,
      type: this.form.value.type.toString(),
      status: 'A',
      creationDate: new Date().toLocaleDateString(),
      creationUser: creationUser,
    };

    if (this.edit) {
      this._documentTypeService
        .editDocumentType(documentType, documentType.id)
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
      this._documentTypeService.addDocumentType(documentType).subscribe(
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
    this._router.navigate(['/dashboard/document-type-list']);
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
        this._documentTypeService
          .deleteDocumentType(this.form.value.id)
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
