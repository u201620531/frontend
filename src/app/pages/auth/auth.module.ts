import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { AgregarPerfilUsuarioComponent } from './perfil-usuario/agregar-perfil-usuario/agregar-perfil-usuario.component';
import { ListarPerfilUsuarioComponent } from './perfil-usuario/listar-perfil-usuario/listar-perfil-usuario.component';
@NgModule({
  declarations: [PerfilUsuarioComponent, AgregarPerfilUsuarioComponent, ListarPerfilUsuarioComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
