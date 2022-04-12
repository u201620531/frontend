import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerType } from 'src/app/interfaces/customer-type';
import { DocumentType } from 'src/app/interfaces/document-type';
import { Supplier } from 'src/app/interfaces/supplier';
import { CustomerTypeService } from 'src/app/services/customer-type.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css'],
})
export class SupplierAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listSupplierTypes: CustomerType[] = [];
  IdSupplier = '';
  idDocumentType: string = '';
  idSupplierType: string = '';
  readonlyOption: boolean = false;

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _supplierTypeService: CustomerTypeService,
    private _supplierService: SupplierService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      Id: [''],
      SupplierType: ['', Validators.required],
      DocumentType: ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      BusinessName: ['', Validators.required],
      ComercialName: ['', Validators.required],
      Address: ['', Validators.required],
      FiscalAddress: ['', Validators.required],
      State: [''],
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
        this.IdSupplier = params['id'];
        const supplier: Supplier[] = this.getSupplier(this.IdSupplier);
        this.idDocumentType = supplier[0].DocumentType.Id;
        this.idSupplierType = supplier[0].SupplierType;
        this.form.setValue({
          Id: supplier[0].Id,
          SupplierType: supplier[0].SupplierType,
          DocumentType: supplier[0].DocumentType,
          DocumentNumber: supplier[0].DocumentNumber,
          BusinessName: supplier[0].BusinessName,
          ComercialName: supplier[0].ComercialName,
          Address: supplier[0].Address,
          FiscalAddress: supplier[0].FiscalAddress,
          State: supplier[0].State,
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

  loadSupplierTypes() {
    this.listSupplierTypes = this._supplierTypeService.getCustomerTypes();
  }

  getSupplier(id: string) {
    return this._supplierService.getSupplierById(id);
  }

  addSupplier() {
    const supplier: Supplier = {
      Id: this.form.value.Id,
      SupplierType: this.form.value.SupplierType,
      DocumentType: this.form.value.DocumentType,
      DocumentNumber: this.form.value.DocumentNumber,
      BusinessName: this.form.value.BusinessName,
      ComercialName: this.form.value.ComercialName,
      Address: this.form.value.Address,
      FiscalAddress: this.form.value.FiscalAddress,
      State: this.form.value.State,
      CreationDate: this.form.value.CreationDate,
      CreationUser: this.form.value.CreationUser,
    };

    this._supplierService.addSupplier(supplier);
    this._router.navigate(['/dashboard/supplier-list']);

    this._snackBar.open('El Proveedor fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }
}
