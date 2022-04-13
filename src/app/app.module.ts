import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//Modules}
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './pages/shared/shared.module';

//Components
import { LoginComponent } from './pages/auth/login/login.component';
import { ScanComponent } from './pages/electronic-documents/scan/scan.component';
import { ListComponent } from './pages/electronic-documents/list/list.component';
import { AddComponent } from './pages/electronic-documents/add/add.component';
import { ReportComponent } from './pages/electronic-documents/report/report.component';
import { GetInformationComponent } from './pages/electronic-documents/get-information/get-information.component';
//*** Customer */
import { CustomerAddComponent } from './pages/customer/customer-add/customer-add.component';
import { CustomerListComponent } from './pages/customer/customer-list/customer-list.component';
//*** Supplier */
import { SupplierAddComponent } from './pages/supplier/supplier-add/supplier-add.component';
import { SupplierListComponent } from './pages/supplier/supplier-list/supplier-list.component';
//*** DocumentType */
import { DocumentTypeAddComponent } from './pages/maintenance/document-type/document-type-add/document-type-add.component';
import { DocumentTypeListComponent } from './pages/maintenance/document-type/document-type-list/document-type-list.component';
//*** Modals */
import { ConfirmationModalComponent } from './pages/modals/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddComponent,
    ScanComponent,
    ListComponent,
    ReportComponent,
    GetInformationComponent,
    CustomerAddComponent,
    CustomerListComponent,
    SupplierAddComponent,
    SupplierListComponent,
    DocumentTypeListComponent,
    DocumentTypeAddComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
