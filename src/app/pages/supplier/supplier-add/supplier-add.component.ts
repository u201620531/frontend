import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupportTableService } from 'src/app/services/support-table.service';
import { supportTables } from 'src/shared/config';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css'],
})
export class SupplierAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: any = [];
  listsupplierTypes: any = [];
  Idsupplier = '';
  idDocumentType: string = '';
  idsupplierType: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  delete: boolean = true;
  confirmation: boolean = false;
  edit: boolean = false;

  constructor(
    private _supportTableService: SupportTableService,
    private _supplierService: SupplierService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      id: [''],
      supplierType: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      businessName: ['', Validators.required],
      comercialName: ['', Validators.required],
      address: ['', Validators.required],
      fiscalAddress: ['', Validators.required],
      status: [''],
      creationDate: [''],
      creationUser: [''],
    });
  }

  ngOnInit(): void {
    this.loadDocumentTypes();
    this.loadSupplierTypes();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.Idsupplier = params['id'];
        this.readonlyId = this.Idsupplier ? true : false;
        this._supplierService
          .getSupplierById(this.Idsupplier)
          .subscribe((res: any) => {
            this.idDocumentType = res.documentType;
            this.idsupplierType = res.supplierType;
            this.form.setValue({
              id: res.id,
              supplierType: res.supplierType,
              documentType: res.documentType,
              documentNumber: res.documentNumber,
              businessName: res.businessName,
              comercialName: res.comercialName,
              address: res.address,
              fiscalAddress: res.fiscalAddress,
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

  loadDocumentTypes() {
    this._supportTableService
      .getSupportTableById(supportTables.documentTypeSupplier)
      .subscribe((res) => {
        this.listDocumentTypes = res;
      });
  }

  loadSupplierTypes() {
    this._supportTableService
      .getSupportTableById(supportTables.supplierType)
      .subscribe((res) => {
        this.listsupplierTypes = res;
      });
  }

  getSupplier(id: string) {
    return this._supplierService.getSupplierById(id);
  }

  addsupplier() {
    const supplier: any = {
      id: this.edit ? this.form.value.Id : '',
      supplierType: this.form.value.supplierType,
      documentType: this.form.value.documentType,
      documentNumber: this.form.value.documentNumber,
      businessName: this.form.value.businessName,
      comercialName: this.form.value.comercialName,
      address: this.form.value.address,
      fiscalAddress: this.form.value.fiscalAddress,
      status: this.form.value.status,
      creationDate: this.form.value.creationDate,
      creationUser: this.form.value.creationUser,
    };

    if (this.edit) {
      this._supplierService.editSupplier(supplier, supplier.id).subscribe(
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
      this._supplierService.addSupplier(supplier).subscribe(
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
          console.log(err);
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
    this._router.navigate(['/dashboard/supplier-list']);
  }

  deleteSupplier(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar al Proveedor ${this.Idsupplier}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        this._supplierService.deleteSupplier(this.form.value.id).subscribe(
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
