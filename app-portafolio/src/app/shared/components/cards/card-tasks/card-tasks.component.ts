import { Component, Input } from '@angular/core';
import { ICoworker, IProyect, ITask } from './card-tasks.metadata';
import { ProyectService } from '@data/services/api/proyect.service';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.css']
})
export class CardTasksComponent {
  @Input() proyecto:IProyect
  coworkers=[]
  users:any

  constructor(
    private proyectService: ProyectService
  ){
  }


  searchWorkerForId(id:number){
    let person = this.proyecto.coworker.find((persona:ICoworker)=>persona.id===1)
    return person
  }

  agregarUser(task:ITask){
    let user = JSON.parse(localStorage.getItem("currentUserCatask")!).id
    let person = this.searchWorkerForId(user)
    let idProyecto = this.proyecto.id
    //console.log("person",person)
    //console.log("task",task)
    //console.log("proyecto",idProyecto)
    this.proyectService.addUserToTask(person!, idProyecto, this.proyecto.task).subscribe(r=>{
      console.log(r)
    })

  }

}
