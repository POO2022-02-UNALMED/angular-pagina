import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { CONST_LOGIN_PAGE } from '@data/constants';
import { AuthService } from '@data/services/api/auth.service';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { Router } from '@angular/router';

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
  msgError:string

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private router : Router
    ){}

  ngOnInit(): void {
    //validations 
    this.loginForm = this.formBuilder.group ({
      email: [ "hola@gmail1.com", [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]] ,
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

      this.loginSubscribe = this.authService.getByCode(this.loginForm.value.email, "login")!.subscribe( r=> {
        let userData:any = r
        console.log(userData)
        if (userData.error== true){
          this.msgError="*No encontramos este email en la base de datos"
          this.loginForm.controls['email'].setErrors({'incorrect': true})

        }
        else{
          if(userData.data.isActive){
            if(this.loginForm.value.password === userData.data.password){
              if(userData.data.isActive== true){
                console.log('login')
                const newData= {
                  email: userData.data.email,
                  password: userData.data.password,
                  id: userData.data.id
                }
                this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_LIST)
                this.authService.loginByEmail(newData).subscribe(r =>{
                  console.log(r)
                })
              } else {
                this.msgError='*Contacte con el admin usuario inactivo'
              }
  
            }
            else{
              this.msgError="*Contraseña incorrecta, puede recuperar su contraseña"
              this.loginForm.controls['password'].setErrors({'incorrect': true})
            }
          }
          
        }
      })

      //let isUserExist = API_ROUTES.USERS.LOGIN.find(m => m.email == this.loginForm.controls['email'].value)
      //this.authService.login(this.loginForm.value).subscribe( r =>{
      //  console.log(r);
      //})

      //this.authService.loginByEmail(this.loginForm.value).subscribe( r =>{
      //  console.log(r);
      //})
      //this.authService.login2(this.loginForm.value)

      //this.authService.loginByEmail(this.loginForm.value).subscribe({
      //  next: (r) => {
      //    console.log(r)
      //  },
      //  error: (error) => {
      //    console.error(error)
      //  },
      //  complete: ()=> {
      //    console.info("login completo")
      //    this.router.navigateByUrl('/panel')
      //  }
      //})

    } else {
      this.msgError= "*Formulario invalido. llene los espacios que se piden"
    }



  }

  ngOnDestroy(){
    if (this.loginSubscribe ) {
      this.loginSubscribe.unsubscribe();
      console.log('unsuscribe')
    }
  }
}


