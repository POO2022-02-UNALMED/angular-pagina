//import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//
//import { ProyectService } from '@data/services/api/proyect.service';
//import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
//@Component({
//selector: 'app-modal-create',
//
//  templateUrl: './modal-create.component.html',
//  styleUrls: ['./modal-create.component.css']
//})
//export class ModalCreateComponent {
//  public show = false
//  
//  @Output() refresh = new EventEmitter<void>();
//  taskForm!: FormGroup
//
//  @Input() workers:Array<ICoworker>
//  user:Array<ICoworker> =[]
//  id:number
//
//constructor(
//  private formBuilder:FormBuilder,
//  
//  private proyectService:ProyectService
//  ){}
//
//
//ngOnInit(): void {
//  
//  
//  //validations 
//
//  this.taskForm = this.formBuilder.group ({
//    admin: [this.workers.find((u:ICoworker)=>u.license==='ADMIN')!.id],
//    name: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(50)]],
//    description: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(60)]],
//    date: [``,[Validators.required]],
//    user:[``]
//  })
//
//}
//  
//
//onSingup(formfield: string){
//if(this.taskForm.valid){
//    
//    return
//  }else {
//
//    this.validateAllFormFields(this.taskForm, formfield)
//  } 
//}
// 
//validateAllFormFields(formGroup: FormGroup, formfield: string){
//  Object.keys(formGroup.controls).forEach(field =>{
//    const control = formGroup.get(field);
//    if (control instanceof FormControl) {
//      this.taskForm.controls[formfield].markAsDirty({onlySelf: true});
//    } else if (control instanceof FormGroup) {
//      this.validateAllFormFields(control, formfield)
//    }
//  })
//}
//autenticate() {
//this.taskForm.markAllAsTouched()
//
//  if(this.taskForm.valid){
//    this.taskForm.controls['user'].setValue(this.user)
//    this.proyectService.addTask(this.taskForm.value).subscribe()
//    console.log(this.taskForm.value)
//    this.hideModal()
//    this.refresh.emit()
//    this.ngOnInit()
//    }else {
//    }
//  }
//
//  showModal(){
//  this.show = true
//
//  }
//  hideModal(){
//  this.show = false
//
//    this.user = []
//  }
//  recibirMensaje(user:ICoworker){
//
//    if (this.user.find((u:ICoworker)=>user.id===u.id)){
//      
//      this.user.forEach((element, index)=>{
//        if(element === user){
//          delete this.user[index];}
//     })
//     this.user.pop()
//     
//    }else{
//      this.user.push(user)
//    }
//    
//    console.log(this.user)
//  }
//  
//}
//

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { HideModalService } from '@shared/services/hide/hide-modal.service';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { WorkersService } from '@shared/services/workers/workers.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent {
  public show = false
  registerTask!: FormGroup
  @Input() workers:Array<ICoworker>
  user:Array<ICoworker> =[]


constructor(
  private formBuilder:FormBuilder,
  private proyectService:ProyectService,
  private refreshService: RefreshService,
  private workersService: WorkersService,
  private hideModalService: HideModalService
  ){}



ngOnInit(): void {
  this.workersService.workers.subscribe(r=>{
    this.workers = r
  })
  this.registerTask = this.formBuilder.group ({
    admin: [this.workers.find((u:ICoworker)=>u.license==='ADMIN')!.id],
    name: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(50)]],
    description: [ ``, [Validators.required, Validators.minLength(5) ,Validators.maxLength(70)]],
    check:[false],
    date: [``,[Validators.required]] ,
    user:[``]
  })
}


onSingup(formfield: string){
  if(this.registerTask.valid){

    return
  }else {
    this.validateAllFormFields(this.registerTask, formfield)
  } 
}
 
validateAllFormFields(formGroup: FormGroup, formfield: string){
  Object.keys(formGroup.controls).forEach(field =>{
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      this.registerTask.controls[formfield].markAsDirty({onlySelf: true});
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control, formfield)
    }
  })
}

autenticate() {
  this.registerTask.markAllAsTouched()
  if(this.registerTask.valid){
    this.registerTask.controls['user'].setValue(this.user)
    this.proyectService.addTask(this.registerTask.value).subscribe()
    console.log(this.registerTask.value)
    this.hideModal()
    this.ngOnInit()
    this.refreshService.refresh.emit()
    }else {
    }
  }


  showModal(){
    this.show = true
    this.hideModalService.hide.emit()
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

