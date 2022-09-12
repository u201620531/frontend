import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//Modules}
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './pages/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { LoginComponent } from './pages/auth/login/login.component';
//*** Modals */
import { ConfirmationModalComponent } from './pages/modals/confirmation-modal/confirmation-modal.component';
import { SearchModalComponent } from './pages/modals/search-modal/search-modal.component';
import { AgregarTipoDocumentoComponent } from './pages/tipo-documento/agregar-tipo-documento/agregar-tipo-documento.component';
import { ListarTipoDocumentoComponent } from './pages/tipo-documento/listar-tipo-documento/listar-tipo-documento.component';
import { AgregarComprobanteComponent } from './pages/comprobante/agregar-comprobante/agregar-comprobante.component';
import { ListarComprobanteComponent } from './pages/comprobante/listar-comprobante/listar-comprobante.component';
import { ReporteComprobanteComponent } from './pages/comprobante/reporte-comprobante/reporte-comprobante.component';
import { PlantillaComprobanteComponent } from './pages/comprobante/plantilla-comprobante/plantilla-comprobante.component';
import { AgregarFormaPagoComponent } from './pages/forma-pago/agregar-forma-pago/agregar-forma-pago.component';
import { ListarFormaPagoComponent } from './pages/forma-pago/listar-forma-pago/listar-forma-pago.component';
import { AgregarProductoComponent } from './pages/producto/agregar-producto/agregar-producto.component';
import { ListarProductoComponent } from './pages/producto/listar-producto/listar-producto.component';
import { AgregarEmpleadoComponent } from './pages/empleado/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadoComponent } from './pages/empleado/listar-empleado/listar-empleado.component';
import { AgregarProveedorComponent } from './pages/proveedor/agregar-proveedor/agregar-proveedor.component';
import { ListarProveedorComponent } from './pages/proveedor/listar-proveedor/listar-proveedor.component';
import { CargarComprobanteComponent } from './pages/comprobante/cargar-comprobante/cargar-comprobante.component';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { fakeBackendProvider } from './helpers';
import { AgregarUsuarioComponent } from './pages/auth/usuario/agregar-usuario/agregar-usuario.component';
import { ListarUsuarioComponent } from './pages/auth/usuario/listar-usuario/listar-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationModalComponent,
    SearchModalComponent,
    AgregarTipoDocumentoComponent,
    ListarTipoDocumentoComponent,
    AgregarComprobanteComponent,
    CargarComprobanteComponent,
    ListarComprobanteComponent,
    ReporteComprobanteComponent,
    PlantillaComprobanteComponent,
    AgregarFormaPagoComponent,
    ListarFormaPagoComponent,
    AgregarProductoComponent,
    ListarProductoComponent,
    AgregarEmpleadoComponent,
    ListarEmpleadoComponent,
    AgregarProveedorComponent,
    ListarProveedorComponent,
    AgregarUsuarioComponent,
    ListarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
