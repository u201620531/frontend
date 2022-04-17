import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { LoginComponent } from './login/login.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
// import { UserProfileListComponent } from './user-profile/user-profile-list/user-profile-list.component';
// import { UserProfileAddComponent } from './user-profile/user-profile-add/user-profile-add.component';


@NgModule({
  declarations: [
    //LoginComponent
  
    UserAddComponent,
    UserListComponent,
    // UserProfileListComponent,
    // UserProfileAddComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
