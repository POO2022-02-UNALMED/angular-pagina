import { Component, Input } from '@angular/core';
import { ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  public show = false
  @Input() task:ITask

  constructor(
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

}
