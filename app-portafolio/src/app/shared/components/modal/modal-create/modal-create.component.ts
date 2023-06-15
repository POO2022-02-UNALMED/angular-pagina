import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent {

  public show = false

  @Output() refresh = new EventEmitter<void>();
  taskForm!: FormGroup
  @Input() workers:Array<ICoworker>
  user:Array<ICoworker> =[]
  id:number


constructor(
  private formBuilder:FormBuilder,
  private proyectService:ProyectService
  ){}



ngOnInit(): void {


  //validations 
  this.taskForm = this.formBuilder.group ({
    admin: [this.workers.find((u:ICoworker)=>u.license==='ADMIN')!.id],
    title: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(50)]],
    description: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(60)]],
    date: [``,[Validators.required]],
    user:[``]
  })


}


onSingup(formfield: string){
  if(this.taskForm.valid){

    return
  }else {
    this.validateAllFormFields(this.taskForm, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.taskForm.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.taskForm.markAllAsTouched()
  if(this.taskForm.valid){
    this.taskForm.controls['user'].setValue(this.user)
    this.proyectService.addTask(this.taskForm.value).subscribe()
    console.log(this.taskForm.value)
    this.hideModal()
    this.refresh.emit()
    this.ngOnInit()
    }else {
    }
  }


  showModal(){
    this.show = true
  }

  hideModal(){
    this.show = false
    this.user = []
  }

  recibirMensaje(user:ICoworker){
    if (this.user.find((u:ICoworker)=>user.id===u.id)){
      
      this.user.forEach((element, index)=>{
        if(element === user){
          delete this.user[index];}
     })
     this.user.pop()
     
    }else{
      this.user.push(user)
    }
    
    console.log(this.user)
  }
  
}
