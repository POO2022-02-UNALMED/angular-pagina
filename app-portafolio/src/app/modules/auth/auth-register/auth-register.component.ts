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

