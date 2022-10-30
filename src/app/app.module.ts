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
import { AgregarEmpleadoComponent } from './pages/empleado/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadoComponent } from './pages/empleado/listar-empleado/listar-empleado.component';
import { AgregarProveedorComponent } from './pages/proveedor/agregar-proveedor/agregar-proveedor.component';
import { ListarProveedorComponent } from './pages/proveedor/listar-proveedor/listar-proveedor.component';
import { CargarComprobanteComponent } from './pages/comprobante/cargar-comprobante/cargar-comprobante.component';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
// import { fakeBackendProvider } from './helpers';
import { AgregarUsuarioComponent } from './pages/auth/usuario/agregar-usuario/agregar-usuario.component';
import { ListarUsuarioComponent } from './pages/auth/usuario/listar-usuario/listar-usuario.component';
import { ListarPlantillaComponent } from './pages/comprobante/listar-plantilla/listar-plantilla.component';
import { CustomPaginator } from './pages/shared/CustomPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { ListarTipoCambioComponent } from './pages/tipo-cambio/listar-tipo-cambio/listar-tipo-cambio.component';
import { AgregarTipoCambioComponent } from './pages/tipo-cambio/agregar-tipo-cambio/agregar-tipo-cambio.component';
import { ListarCuentaContableComponent } from './pages/cuenta-contable/listar-cuenta-contable/listar-cuenta-contable.component';
import { AgregarCuentaContableComponent } from './pages/cuenta-contable/agregar-cuenta-contable/agregar-cuenta-contable.component';
import { CambiarContrasenaComponent } from './pages/auth/cambiar-contrasena/cambiar-contrasena.component';
import { SoloNumeros } from './directives/solo-numeros.directive';
import { FormatoMonedaDirective } from './directives/formatoMoneda';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AgregarPerfilUsuarioComponent } from './pages/auth/perfil-usuario/agregar-perfil-usuario/agregar-perfil-usuario.component';
import { ListarPerfilUsuarioComponent } from './pages/auth/perfil-usuario/listar-perfil-usuario/listar-perfil-usuario.component';
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
    ListarPlantillaComponent,
    PlantillaComprobanteComponent,
    AgregarFormaPagoComponent,
    ListarFormaPagoComponent,
    AgregarEmpleadoComponent,
    ListarEmpleadoComponent,
    AgregarProveedorComponent,
    ListarProveedorComponent,
    AgregarUsuarioComponent,
    CambiarContrasenaComponent,
    ListarUsuarioComponent,
    ListarTipoCambioComponent,
    AgregarTipoCambioComponent,
    ListarCuentaContableComponent,
    AgregarCuentaContableComponent,
   AgregarPerfilUsuarioComponent,
   ListarPerfilUsuarioComponent,
    SoloNumeros,
    FormatoMonedaDirective
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
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
