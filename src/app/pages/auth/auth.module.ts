import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
@NgModule({
  declarations: [
    PerfilUsuarioComponent  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
