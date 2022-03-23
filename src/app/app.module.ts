import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScanElectronicDocumentsComponent } from './pages/scan-electronic-documents/scan-electronic-documents.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanElectronicDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
