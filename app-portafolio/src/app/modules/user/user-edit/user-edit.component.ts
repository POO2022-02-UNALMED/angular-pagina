import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICompleteUser } from '@data/interfaces';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{

  editPerfil: FormGroup
  datosBase:ICompleteUser

  constructor(
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {

    this.datosBase = JSON.parse(localStorage.getItem("currentUserCatask")!)

    this.editPerfil = this.formBuilder.group({
      //editables
      name: [`${this.datosBase.name}`, [Validators.required, Validators.maxLength(10)]],
      age: [this.datosBase.age, [Validators.pattern((/^[0-9]*$/))]],
      description: [`${this.datosBase.description}`, [Validators.required, Validators.maxLength(18)]],
      gender: [`${this.datosBase.gender}`],
      info: [`${this.datosBase.info}`,  [Validators.required, Validators.maxLength(100)]],
      avatar:[`${this.datosBase.avatar}`, [Validators.required]],
      //no editables
      email: [`${this.datosBase.email}`],
      password: [`${this.datosBase.password}`],
      work: [this.datosBase.work],
      id: [this.datosBase.id],
      license: [`${this.datosBase.license}`],
    })
  }

  onEdit(formfield: string){
    if(this.editPerfil.valid){
      return
    }else {
      this.validateAllFormFields(this.editPerfil, formfield)
      console.log('hola',this.editPerfil.value)
    } 
  }

  validateAllFormFields(formGroup: FormGroup, formfield: string){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        this.editPerfil.controls[formfield].markAsDirty({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control, formfield)
      }
    })
  }
  
}
