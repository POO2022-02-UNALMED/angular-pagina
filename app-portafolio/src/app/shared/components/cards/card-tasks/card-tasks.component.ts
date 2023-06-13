import { Component, Input } from '@angular/core';
import { ICoworker, IProyect } from './card-tasks.metadata';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.css']
})
export class CardTasksComponent {
  @Input() proyecto:IProyect
  users:any

  constructor(
  ){
  }


  buscarPersonaPorId(id:number){
    let person = this.proyecto.coworker.find((person:ICoworker)=>person.id===id)
    console.log(person)
    return person?.name
  }

}
