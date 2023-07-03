import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';
import { ProyectService } from '@data/services/api/proyect.service';
import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { HideModalService } from '@shared/services/hide/hide-modal.service';
import { RefreshService } from '@shared/services/refresh/refresh.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css'],
})
export class ModalTaskComponent implements OnInit {
  public show = false
  @Input() task:ITask
  @Output() edit = new EventEmitter<void>();
  @Input () colaborando:boolean
  admin:boolean=false
  my:any

  errorMsg:string 
  constructor(
    private proyectService: ProyectService,
    private refreshService: RefreshService,
    private hideModalService: HideModalService,
    private authService: AuthService
    
  ){
  }
  async ngOnInit(): Promise<void> {
    let mi = await this.getuser()
    if(mi.error){
      this.errorMsg=mi.message
    }else{
      this.my=mi.data
    }
    this.admin= this.my.is_Admin
    
    this.hideModalService.hide.subscribe(
      this.hideModal()
    )
  }

  getuser():Promise<IresponseValidation>{
    return this.authService.users().toPromise()
  }

  recibirMensaje(){
    this.hideModal()
  }

  showModal(){
    this.show = true
    this.hideModalService.hide.emit()
  }

  hideModal(){
    this.show = false
  }

  editTask(){
    this.hideModal()
    this.edit.emit()
  }

  delete(task:ITask){
    this.proyectService.deleteTask(task).subscribe(r=>{
      if(r.error){
        this.errorMsg=r.message
      }
    })
    this.refreshService.refresh.emit()
    this.ngOnInit
    this.hideModal()
    
  }

  chekTask(){
    this.task.chek = !this.task.chek
    this.proyectService.editTask(this.task.id, this.task).subscribe(r=>{
      if(r.error){
        this.errorMsg=r.message
      }
    })
    this.hideModal()
    this.edit.emit()
  }


}
