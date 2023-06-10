import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AuthRegisterComponent,
    AuthLoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    CommonModule
  ]
})
export class AuthModule { }
