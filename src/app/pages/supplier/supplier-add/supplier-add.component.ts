import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerType } from 'src/app/interfaces/customer-type';
import { DocumentType } from 'src/app/interfaces/document-type';
import { Supplier } from 'src/app/interfaces/supplier';
import { CustomerTypeService } from 'src/app/services/customer-type.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listSupplierTypes: CustomerType[] = [];
  SupplierTypeId: string = '';

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _supplierTypeService: CustomerTypeService,
    private _supplierService: SupplierService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this._formBuilder.group({
      SupplierType: ['', Validators.required],
      DocumentType: ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      BusinessName: ['', Validators.required],
      ComercialName: ['', Validators.required],
      Address: ['', Validators.required],
      FiscalAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDocumentTypes();
    this.loadSupplierTypes();
  }

  loadDocumentTypes() {
    this.listDocumentTypes = this._documentTypeService.getDocumentTypes();
  }

  loadSupplierTypes() {
    this.listSupplierTypes = this._supplierTypeService.getCustomerTypes();
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
    this.router.navigate(['/dashboard/Supplier-list']);

    this._snackBar.open(
      'El Proveedor fue registrado con éxito.',
      '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1500,
      }
    );
  }
}
