import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@data/services/api/auth.service';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

//public registerForm: FormGroup
//public registerSubmitted = false
//
//constructor(
//  private formBuilder: FormBuilder
//){
//  this.registerForm = this.formBuilder.group({
//    email: [
//      '',
//      [
//        Validators.required,
//        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
//      ]
//    ],
//    password: ['', [Validators.required, Validators.maxLength(10)]],
//    person: this.formBuilder.group({
//      name: ['', [Validators.required, Validators.maxLength(7)]],
//      lastName: ['', [Validators.required, Validators.maxLength(10)]]
//    })
//  });
//}
//
//ngOnInit(): void {
//    this.registerForm.get('email')!.setValue('nuevo@email.com')
//}
//get fm() {
//  console.log('holi')
//  return this.registerForm.controls;
//}
//
//get fp() {
//  console.log('holi1')
//  return this.registerForm.controls['person'];
//}
//
//authenticate() {
//  this.registerSubmitted = true;
//  if (this.registerForm.valid) {
//    return;
//  } else {
//    console.log('autenticado')
//  }
//}
//}

registerForm!: FormGroup
registerSubscribe : any
searchEmailSubscribe : any
msgError: string

constructor(
  private formBuilder:FormBuilder,
  private authService:AuthService,
  ){}



ngOnInit(): void {
  //validations 
  this.registerForm = this.formBuilder.group ({
    firstName: [ '', [Validators.required,  Validators.pattern(/^[a-z0-9._%+-]{3,10}$/)]],
    lastName: [ '', [Validators.pattern(/^[a-z0-9._%+-]{0,10}$/)]],
    email: [ '', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]] ,
    password: [ '', Validators.required],
  })
}


onSingup(formfield: string){
  if(this.registerForm.valid){

    return
  }else {
    this.validateAllFormFields(this.registerForm, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.registerForm.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.registerForm.markAllAsTouched()
  if(this.registerForm.valid){
    this.searchEmailSubscribe = this.authService.getByCode(this.registerForm.value.email)!.subscribe( r=> {
      if (!r.error){
        this.registerSubscribe = this.authService.register(this.registerForm.value).subscribe(r=>{
        })
      } else{
        this.registerForm.controls['email'].setErrors({'incorrect': true})
        this.msgError= r.message
      }
    })
  
  } else {
    this.msgError= "*Formulario invalido. llene los espacios que se piden"
  }
}

ngOnDestroy(){
  if (this.registerSubscribe ) {
    this.registerSubscribe.unsubscribe();
    console.log('unsuscribe')
  }
  
  if (this.searchEmailSubscribe ) {
    this.searchEmailSubscribe.unsubscribe();
    console.log('unsuscribe')
  }
}

}

