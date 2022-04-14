import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from '../electronic-documents/list/list.component';
import { ScanComponent } from '../electronic-documents/scan/scan.component';
import { AddComponent } from '../electronic-documents/add/add.component';
import { GetInformationComponent } from '../electronic-documents/get-information/get-information.component';
import { ReportComponent } from '../electronic-documents/report/report.component';
import { CustomerAddComponent } from '../customer/customer-add/customer-add.component';
import { CustomerListComponent } from '../customer/customer-list/customer-list.component';
import { SupplierAddComponent } from '../supplier/supplier-add/supplier-add.component';
import { SupplierListComponent } from '../supplier/supplier-list/supplier-list.component';
import { DocumentTypeAddComponent } from '../maintenance/document-type/document-type-add/document-type-add.component';
import { DocumentTypeListComponent } from '../maintenance/document-type/document-type-list/document-type-list.component';
import { FormatTypeAddComponent } from '../maintenance/format-type/format-type-add/format-type-add.component';
import { FormatTypeListComponent } from '../maintenance/format-type/format-type-list/format-type-list.component';
import { TransactionTypeAddComponent } from '../maintenance/transaction-type/transaction-type-add/transaction-type-add.component';
import { TransactionTypeListComponent } from '../maintenance/transaction-type/transaction-type-list/transaction-type-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'electronic-documents-scan', component: ScanComponent },
      {
        path: 'electronic-documents-get-information',
        component: GetInformationComponent,
      },
      { path: 'electronic-documents-list', component: ListComponent },
      { path: 'electronic-documents-add', component: AddComponent },
      { path: 'electronic-documents-report', component: ReportComponent },
      { path: 'customer-add', component: CustomerAddComponent },
      { path: 'customer-list', component: CustomerListComponent },
      { path: 'supplier-add', component: SupplierAddComponent },
      { path: 'supplier-list', component: SupplierListComponent },
      { path: 'document-type-add', component: DocumentTypeAddComponent },
      { path: 'document-type-list', component: DocumentTypeListComponent },
      { path: 'format-type-add', component: FormatTypeAddComponent },
      { path: 'format-type-list', component: FormatTypeListComponent },
      { path: 'transaction-type-add', component: TransactionTypeAddComponent },
      { path: 'transaction-type-list', component: TransactionTypeListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
