import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent implements OnInit {
  public show = false
  @Input() task:ITask

  constructor(
    private proyectService: ProyectService
  ){
  }
  ngOnInit(): void {
  }

  showModal(){
    this.show = true
  }

  hideModal(){
    this.show = false
  }

  delete(task:ITask){
    this.proyectService.deleteTask(task).subscribe()
    this.ngOnInit
    this.hideModal()
    
  }


}
