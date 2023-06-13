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

  agregarUser(idTask:number){
    let idUser = JSON.parse(localStorage.getItem("currentUserCatask")!).id
    let idProyecto = this.proyecto.id
    console.log("id user",idUser)
    console.log("id task",idTask)
    console.log("id proyecto",idProyecto)
  }

}
