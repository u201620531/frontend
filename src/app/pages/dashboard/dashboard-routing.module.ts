import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { AgregarTipoDocumentoComponent } from '../tipo-documento/agregar-tipo-documento/agregar-tipo-documento.component';
import { ListarTipoDocumentoComponent } from '../tipo-documento/listar-tipo-documento/listar-tipo-documento.component';
import { ReporteComprobanteComponent } from '../comprobante/reporte-comprobante/reporte-comprobante.component';
import { ListarComprobanteComponent } from '../comprobante/listar-comprobante/listar-comprobante.component';
import { PlantillaComprobanteComponent } from '../comprobante/plantilla-comprobante/plantilla-comprobante.component';
import { AgregarFormaPagoComponent } from '../forma-pago/agregar-forma-pago/agregar-forma-pago.component';
import { ListarFormaPagoComponent } from '../forma-pago/listar-forma-pago/listar-forma-pago.component';
import { AgregarComprobanteComponent } from '../comprobante/agregar-comprobante/agregar-comprobante.component';
import { AgregarProveedorComponent } from '../proveedor/agregar-proveedor/agregar-proveedor.component';
import { ListarProveedorComponent } from '../proveedor/listar-proveedor/listar-proveedor.component';
import { AgregarProductoComponent } from '../producto/agregar-producto/agregar-producto.component';
import { ListarProductoComponent } from '../producto/listar-producto/listar-producto.component';
import { CargarComprobanteComponent } from '../comprobante/cargar-comprobante/cargar-comprobante.component';
import { AgregarUsuarioComponent } from '../auth/usuario/agregar-usuario/agregar-usuario.component';
import { ListarUsuarioComponent } from '../auth/usuario/listar-usuario/listar-usuario.component';
import { ListarPlantillaComponent } from '../comprobante/listar-plantilla/listar-plantilla.component';
import { AgregarCuentaContableComponent } from '../cuenta-contable/agregar-cuenta-contable/agregar-cuenta-contable.component';
import { AgregarTipoCambioComponent } from '../tipo-cambio/agregar-tipo-cambio/agregar-tipo-cambio.component';
import { ListarTipoCambioComponent } from '../tipo-cambio/listar-tipo-cambio/listar-tipo-cambio.component';
import { ListarCuentaContableComponent } from '../cuenta-contable/listar-cuenta-contable/listar-cuenta-contable.component';
import { AgregarSubCuentaContableComponent } from '../sub-cuenta-contable/agregar-sub-cuenta-contable/agregar-sub-cuenta-contable.component';
import { ListarSubCuentaContableComponent } from '../sub-cuenta-contable/listar-sub-cuenta-contable/listar-sub-cuenta-contable.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'agregar-comprobante', component: AgregarComprobanteComponent },
      { path: 'cargar-comprobante', component: CargarComprobanteComponent },
      { path: 'listar-comprobante', component: ListarComprobanteComponent },
      { path: 'plantilla-comprobante', component: ListarPlantillaComponent },
      {
        path: 'agregar-plantilla-comprobante',
        component: PlantillaComprobanteComponent,
      },
      { path: 'reporte-comprobante', component: ReporteComprobanteComponent },
      { path: 'agregar-proveedor', component: AgregarProveedorComponent },
      { path: 'listar-proveedor', component: ListarProveedorComponent },
      { path: 'agregar-producto', component: AgregarProductoComponent },
      { path: 'listar-producto', component: ListarProductoComponent },
      {
        path: 'agregar-tipo-documento',
        component: AgregarTipoDocumentoComponent,
      },
      {
        path: 'listar-tipo-documento',
        component: ListarTipoDocumentoComponent,
      },
      { path: 'agregar-forma-pago', component: AgregarFormaPagoComponent },
      { path: 'listar-forma-pago', component: ListarFormaPagoComponent },
      { path: 'agregar-usuario', component: AgregarUsuarioComponent },
      { path: 'listar-usuario', component: ListarUsuarioComponent },
      { path: 'agregar-tipo-cambio', component: AgregarTipoCambioComponent },
      { path: 'listar-tipo-cambio', component: ListarTipoCambioComponent },
      {
        path: 'agregar-cuenta-contable',
        component: AgregarCuentaContableComponent,
      },
      {
        path: 'listar-cuenta-contable',
        component: ListarCuentaContableComponent,
      },
      {
        path: 'agregar-sub-cuenta-contable',
        component: AgregarSubCuentaContableComponent,
      },
      {
        path: 'listar-sub-cuenta-contable',
        component: ListarSubCuentaContableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
