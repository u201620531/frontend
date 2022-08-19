import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { SupportTableService } from 'src/app/services/support-table.service';
import { supportTables } from 'src/shared/config';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  form: FormGroup;
  listDocumentTypes: any = [];
  listCustomerTypes: any = [];
  IdCustomer = '';
  idDocumentType: string = '';
  idCustomerType: string = '';
  readonlyId: boolean = false;
  readonlyOption: boolean = false;
  delete: boolean = true;
  confirmation: boolean = false;
  edit: boolean = false;

  constructor(
    private _documentTypeService: DocumentTypeService,
    private _supportTableService: SupportTableService,
    private _customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      id: [''],
      customerType: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      businessName: ['', Validators.required],
      comercialName: ['', Validators.required],
      address: ['', Validators.required],
      fiscalAddress: ['', Validators.required],
      status: [''],
      creationDate:[''],
      creationUser:['']

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
        this.readonlyId = this.IdCustomer ? true : false;
        this._customerService
          .getCustomerById(this.IdCustomer)
          .subscribe((res: any) => {
            this.idDocumentType = res.documentType;
            this.idCustomerType = res.customerType;
            this.form.setValue({
              id: res.id,
              customerType: res.customerType,
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
    this._supportTableService.getSupportTableById(supportTables.documentTypeCustomer).subscribe((res) => {
      this.listDocumentTypes = res;
    });
  }

  loadCustomerTypes() {
    this._supportTableService.getSupportTableById(supportTables.customerType).subscribe((res) => {
      this.listCustomerTypes = res;
    });
  }

  getCustomer(id: string) {
    return this._customerService.getCustomerById(id);
  }

  addCustomer() {
    const customer: any = {
      id: this.edit ? this.form.value.Id : "",
      customerType: this.form.value.customerType,
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
      this._customerService.editCustomer(customer, customer.id).subscribe(
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
      this._customerService.addCustomer(customer).subscribe(
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
        this._customerService.deleteCustomer(this.form.value.id).subscribe(
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
