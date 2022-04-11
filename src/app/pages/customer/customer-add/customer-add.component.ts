import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerType } from 'src/app/interfaces/customer-type';
import { DocumentType } from 'src/app/interfaces/document-type';
import { CustomerTypeService } from 'src/app/services/customer-type.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listCustomerTypes: CustomerType[] = [];
  customerTypeId: string = '';

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _customerTypeService: CustomerTypeService,
    private _customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this._formBuilder.group({
      CustomerType: ['', Validators.required],
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
    this.loadCustomerTypes();
  }

  loadDocumentTypes() {
    this.listDocumentTypes = this._documentTypeService.getDocumentTypes();
  }

  loadCustomerTypes() {
    this.listCustomerTypes = this._customerTypeService.getCustomerTypes();
  }

  addCustomer() {
    const customer: Customer = {
      Id: this.form.value.Id,
      CustomerType: this.form.value.CustomerType,
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

    this._customerService.addCustomer(customer);
    this.router.navigate(['/dashboard/customer-list']);

    this._snackBar.open(
      'El Cliete fue registrado con éxito.',
      '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1500,
      }
    );
  }
}
