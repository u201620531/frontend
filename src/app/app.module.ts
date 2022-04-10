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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddComponent,
    ScanComponent,
    ListComponent,
    ReportComponent,
    GetInformationComponent
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
