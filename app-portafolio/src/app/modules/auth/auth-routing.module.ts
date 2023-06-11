import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { INTERNAL_PATHS } from '@data/constants/routes';

const routes: Routes = [
  {path: '', redirectTo: INTERNAL_PATHS.AUTH_LOGIN, pathMatch: 'full'},
  {path: INTERNAL_PATHS.AUTH_LOGIN, component: AuthLoginComponent},
  {path: INTERNAL_PATHS.AUTH_REGISTER, component: AuthRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

