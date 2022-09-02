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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'agregar-comprobante', component: AgregarComprobanteComponent },
      { path: 'cargar-comprobante', component: CargarComprobanteComponent },
      { path: 'listar-comprobante', component: ListarComprobanteComponent },
      { path: 'plantilla-comprobante', component: PlantillaComprobanteComponent },
      { path: 'reporte-comprobante', component: ReporteComprobanteComponent },
      { path: 'agregar-proveedor', component: AgregarProveedorComponent },
      { path: 'listar-proveedor', component: ListarProveedorComponent },
      { path: 'agregar-producto', component: AgregarProductoComponent },
      { path: 'listar-producto', component: ListarProductoComponent },
      { path: 'agregar-tipo-documento', component: AgregarTipoDocumentoComponent },
      { path: 'listar-tipo-documento', component: ListarTipoDocumentoComponent },
      { path: 'agregar-forma-pago', component: AgregarFormaPagoComponent },
      { path: 'listar-forma-pago', component: ListarFormaPagoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
