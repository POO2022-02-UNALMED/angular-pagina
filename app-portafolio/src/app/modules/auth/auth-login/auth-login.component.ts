import { Component } from '@angular/core';
import { CONST_LOGIN_PAGE } from '@data/constants';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent {

  public data = CONST_LOGIN_PAGE;
  public loginForm: any
  public auth: boolean

  constructor() {
    this.loginForm = this.data.FORM
  }

  get isValidForm(){
    this.auth = this.loginForm.email.isValid() && this.loginForm.password.isValid()
    return (this.auth)
  }

  autenticate() {
    console.log('autentificacion')
  }

}
