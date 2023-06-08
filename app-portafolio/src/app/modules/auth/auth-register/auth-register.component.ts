import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONST_REGISTER_PAGE } from '@data/constants/pages/register/register.const';

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

public data = CONST_REGISTER_PAGE
public registerData: any
registerForm!: FormGroup

constructor(private formBuilder:FormBuilder){}



ngOnInit(): void {
  //validations 
  this.registerForm = this.formBuilder.group ({
    firstName: [ '', [Validators.required, Validators.maxLength(8)]],
    lastName: [ '', [Validators.required, Validators.maxLength(10)]],
    email: [ '', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]] ,
    password: [ '', Validators.required],
  })
}


onSingup(formfield: string){
  if(this.registerForm.valid){

    alert("tu formulario es valido")
    console.log(this.registerForm.value)
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

}

