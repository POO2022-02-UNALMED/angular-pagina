import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@data/services/api/auth.service';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ProyectService } from '@data/services/api/proyect.service';

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
msgError: string

constructor(
  private formBuilder:FormBuilder,
  private authService:AuthService,
  private proyectService: ProyectService
  ){}



ngOnInit(): void {
  //validations 
  this.registerForm = this.formBuilder.group ({
    name: [ , [Validators.required,  Validators.pattern(/^[a-z0-9._%+-]{3,10}$/)]],
    email: [ , [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]] ,
    password: [ , Validators.required],
    is_Admin: [ , Validators.required],
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
    if(this.registerForm.controls['is_Admin'].value=== 'true'){
      this.registerForm.controls['is_Admin'].setValue(true)
      this.registerSubscribe =this.authService.register(this.registerForm.value).subscribe(r=>{
        if(r.error){
          this.msgError=r.message
        }else{
          this.authService.editUser({id_Proyect:r.data.id}, r.data.id_Admin).subscribe(r=>{
            if(r.error){
              this.msgError=r.message
            }
          })
        }
      })
    }else{
      this.registerForm.controls['is_Admin'].setValue(false)
      this.registerSubscribe =this.authService.register(this.registerForm.value).subscribe(r=>{
        if(r.error){
          this.msgError=r.message
        }
      })
    }
    
  //  if(this.registerForm.controls['is_Admin'].value === 'true'){
  //    console.log('true')
  //    this.registerSubscribe =this.authService.register(this.registerForm.value).subscribe(user=>{
  //      console.log('id de user',user.data.id)
  //      this.proyectService.addProyect(user.data.id).subscribe()
  //    })
  //  }else{
  //    console.log('false')
  //    this.registerSubscribe =this.authService.register(this.registerForm.value).subscribe()
  //  }
  
    
    //this.searchEmailSubscribe = this.authService.getByCode(this.registerForm.value.email)!.subscribe( r=> {
    //  if (!r.error){
    //    this.registerSubscribe = this.authService.register(this.registerForm.value).subscribe(r=>{
    //    })
    //  } else{
    //    this.registerForm.controls['email'].setErrors({'incorrect': true})
    //    this.msgError= r.message
    //  }
    //})
  
  } else {
    this.msgError= "*Formulario invalido. llene los espacios que se piden"
  }
}

ngOnDestroy(){
  if (this.registerSubscribe ) {
    this.registerSubscribe.unsubscribe();
  }
}

}

