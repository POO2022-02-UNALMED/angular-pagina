import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent {
  public show = false
  registerForm!: FormGroup
  @Input() workers:Array<ICoworker>


constructor(
  private formBuilder:FormBuilder,
  ){}



ngOnInit(): void {
  //validations 
  this.registerForm = this.formBuilder.group ({
    firstName: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(50)]],
    description: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(60)]],
    date: [``,[Validators.required]] ,
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
    console.log('edit')
    this.hideModal()
    }else {
    }
  }


  showModal(){
    this.show = true
  }

  hideModal(){
    this.show = false
  }


  
}
