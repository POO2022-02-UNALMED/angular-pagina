import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { HideModalService } from '@shared/services/hide/hide-modal.service';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { WorkersService } from '@shared/services/workers/workers.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  public show = false
  workers:Array<ICoworker>
  @Input() task:ITask
  
  editForm!: FormGroup
  @Output() enviar: EventEmitter<void> = new EventEmitter<void>();
  user:Array<ICoworker> =[]
  id:number

  msgError: string

constructor(
  private formBuilder:FormBuilder,
  private proyectService : ProyectService,
  private refreshService: RefreshService,
  private workersService: WorkersService,
  private hideModalService:HideModalService
  ){
    
  }



ngOnInit(){

  this.user = this.task.user


  this.workersService.workers$.subscribe(m=>{
    this.workers=m
  })
  

  //validations 
  this.editForm = this.formBuilder.group ({
    admin: [this.workers.find((u:ICoworker)=>u.license==='ADMIN')!.id],
    name: [ `${this.task.name}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(49)]],
    description: [ `${this.task.description}`, [Validators.required, Validators.minLength(5) ,Validators.maxLength(70)]],
    date: [`${this.task.date}`] ,
    user:[``]
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
    this.editForm.controls['user'].setValue(this.user)
    this.proyectService.editTask(this.task.id, this.editForm.value).subscribe()
    this.hideModalService.hide.emit()
    this.refreshService.refresh.emit()
    this.ngOnInit()
    }else {
    }
  }

  showModal(){
    this.show = true
    this.hideModalService.hide.emit()
  }

  hideModal(){
    this.show = false
    this.refreshService.refresh.emit()
    this.hideModalService.hide.emit()
    this.ngOnInit()
  }

  isSelected(worker:ICoworker):boolean{
    if(this.task.user.find((person:ICoworker)=>person.id===worker.id)){
      return true
    }else{
      return false
    }

  }

}
