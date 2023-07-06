import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { CONST_LOGIN_PAGE } from '@data/constants';
import { AuthService } from '@data/services/api/auth.service';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit{
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
  loginSubscribe: any
  loginLocalSubscribe:any
  msgError:string

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private router : Router
    ){}

  ngOnInit(): void {
    //validations 
    this.loginForm = this.formBuilder.group ({
      email: [, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]] ,
      password: [, Validators.required],
    })
  }

  onSingin(formfield: string){
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
      this.loginLocalSubscribe = this.authService.login(this.loginForm.value)!.subscribe( r=> {
        this.msgError= r.message
        if(r.error){
          if(r.message===ERRORS_CONST.LOGIN.USER){
            this.loginForm.controls['email'].setErrors({'incorrect': true})
          }
          if(r.message===ERRORS_CONST.LOGIN.PASSWORD){
            this.loginForm.controls['password'].setErrors({'incorrect': true})
          }
        }else{
          //TODO
        //this.authService.user()!.subscribe()
        }
      })
    }
  }  

  ngOnDestroy(){
    if (this.loginSubscribe ) {
      this.loginSubscribe.unsubscribe();
      console.log('unsuscribe')
    }
  }
}


