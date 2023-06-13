import { Component, Input, OnInit } from '@angular/core';
import { ICoworker, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent implements OnInit {
  public show = false
  //@Input() title:string
  //@Input() description:string
  //@Input() limite:string
  @Input() task:ITask

  constructor(){
  }
  ngOnInit(): void {
    console.log(this.task)
  }

  showModal(){
    this.show = true
  }

  hideModal(){
    this.show = false
  }

}
