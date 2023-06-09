import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { CONST_LOGIN_PAGE } from '@data/constants';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent {
//
//  public data = CONST_LOGIN_PAGE;
//  public loginForm: any
//  public auth: boolean
//
//  constructor() {
//    this.loginForm = this.data.FORM
//  }
//
//  get isValidForm(){
//    this.auth = this.loginForm.email.isValid() && this.loginForm.password.isValid()
//    return (this.auth)
//  }
//
//  autenticate() {
//    console.log('autentificacion')
//  }

loginForm!: FormGroup

constructor(
  private formBuilder:FormBuilder,
  private authService: AuthService
  ){}

ngOnInit(): void {
  //validations 
  this.loginForm = this.formBuilder.group ({
    email: [ "hola@gmail.com", [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]] ,
    password: [ '12345', Validators.required],
  })
}

onSingin(formfield: string){
  console.log(this.loginForm.value)
  if(this.loginForm.valid){
    return
  }else {
    this.validateAllFormFields(this.loginForm, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.loginForm.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.loginForm.markAllAsTouched()
  if(this.loginForm.valid){
    //this.authService.login(this.loginForm.value).subscribe( r =>{
    //  console.log(r);
    //})
    this.authService.login2(this.loginForm.value)
  } else {
  }
}


}
