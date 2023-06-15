import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  public show = false
  @Input() workers:Array<ICoworker>
  @Input() task:ITask
  
  editForm!: FormGroup
  @Output() enviar: EventEmitter<void> = new EventEmitter<void>();
  user:Array<ICoworker> =[]
  id:number




  msgError: string

constructor(
  private formBuilder:FormBuilder,
  ){}



ngOnInit(): void {
  console.log("holiss",this.workers)
  //validations 
  this.editForm = this.formBuilder.group ({
    name: [ `${this.task.name}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(49)]],
    description: [ `${this.task.description}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(60)]],
    date: [``] ,
  })
}

recibirMensaje(user:ICoworker){
  if (this.task.user.find((u:ICoworker)=>user.id===u.id)){
    
    this.task.user.forEach((element, index)=>{
      if(element === user){
        delete this.task.user[index];}
   })
   this.task.user.pop()
   
  }else{
    this.task.user.push(user)
  }
  
  console.log(this.task.user)
}


onSingup(formfield: string){
  if(this.editForm.valid){

    return
  }else {
    this.validateAllFormFields(this.editForm, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.editForm.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.editForm.markAllAsTouched()
  if(this.editForm.valid){
    console.log('edit')
    this.hideModal()
    }else {
    this.msgError= "*Formulario invalido. llene los espacios que se piden"
    }
  }


  showModal(){
    this.show = true
  }

  hideModal(){
    this.show = false
    this.ngOnInit()
    this.enviar.emit()
  }

}
