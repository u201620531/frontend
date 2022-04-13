import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerType } from 'src/app/interfaces/customer-type';
import { DocumentType } from 'src/app/interfaces/document-type';
import { CustomerTypeService } from 'src/app/services/customer-type.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: DocumentType[] = [];
  listCustomerTypes: CustomerType[] = [];
  IdCustomer = '';
  idDocumentType: string = '';
  idCustomerType: string = '';
  readonlyOption: boolean = false;
  confirmation: boolean= false;

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _customerTypeService: CustomerTypeService,
    private _customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      Id: [''],
      CustomerType: ['', Validators.required],
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
    this.loadCustomerTypes();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdCustomer = params['id'];
        const customer: Customer[] = this.getCustomer(this.IdCustomer);
        this.idDocumentType = customer[0].DocumentType.Id;
        this.idCustomerType = customer[0].CustomerType;
        this.form.setValue({
          Id: customer[0].Id,
          CustomerType: customer[0].CustomerType,
          DocumentType: customer[0].DocumentType,
          DocumentNumber: customer[0].DocumentNumber,
          BusinessName: customer[0].BusinessName,
          ComercialName: customer[0].ComercialName,
          Address: customer[0].Address,
          FiscalAddress: customer[0].FiscalAddress,
          State: customer[0].State,
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

  loadCustomerTypes() {
    this.listCustomerTypes = this._customerTypeService.getCustomerTypes();
  }

  getCustomer(id: string) {
    return this._customerService.getCustomerById(id);
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
    this._router.navigate(['/dashboard/customer-list']);

    this._snackBar.open('El Cliete fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  back() {
    this._router.navigate(['/dashboard/customer-list']);
  }

  deleteCustomer(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar al Cliente ${this.IdCustomer}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        //this._customerService.deleteCustomer(0);
        this.back();
      }
    });
  }
}
