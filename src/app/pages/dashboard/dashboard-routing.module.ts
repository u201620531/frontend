import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from '../electronic-documents/list/list.component';
import { ScanComponent } from '../electronic-documents/scan/scan.component';
import { AddComponent } from '../electronic-documents/add/add.component';
import { GetInformationComponent } from '../electronic-documents/get-information/get-information.component';
import { ReportComponent } from '../electronic-documents/report/report.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: MainComponent },
    { path: 'electronic-documents-scan', component: ScanComponent },
    { path: 'electronic-documents-get-information', component: GetInformationComponent },
    { path: 'electronic-documents-list', component: ListComponent },
    { path: 'electronic-documents-add', component: AddComponent },
    { path: 'electronic-documents-report', component: ReportComponent }
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
