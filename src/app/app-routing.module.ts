import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserProfileAddComponent } from './pages/auth/user-profile/user-profile-add/user-profile-add.component';
import { UserProfileListComponent } from './pages/auth/user-profile/user-profile-list/user-profile-list.component';
import { UserAddComponent } from './pages/auth/user/user-add/user-add.component';
import { UserListComponent } from './pages/auth/user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-profile-list', component: UserProfileListComponent },
  { path: 'user-profile-add', component: UserProfileAddComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
