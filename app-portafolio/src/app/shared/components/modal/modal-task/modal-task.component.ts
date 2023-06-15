import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css'],
})
export class ModalTaskComponent implements OnInit {
  public show = false
  @Input() task:ITask
  @Input() workers:Array<ICoworker>
  @Output() edit = new EventEmitter<void>();
  @Output() del = new EventEmitter<void>();


  constructor(
    private proyectService: ProyectService,
    
  ){
  }
  ngOnInit(): void {
  }

  recibirMensaje(){
    this.hideModal()
  }

  showModal(){
    this.show = true
  }

  hideModal(){
    console.log('recibido')
    this.show = false
  }

  editTask(){
    this.hideModal()
    this.edit.emit()
    console.log("editando")
  }

  delete(task:ITask){
    this.proyectService.deleteTask(task).subscribe()
    this.del.emit()
    this.ngOnInit
    this.hideModal()
    
  }


}
