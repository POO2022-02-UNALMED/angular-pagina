import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoworker, IProyect, ITask } from './card-tasks.metadata';
import { ProyectService } from '@data/services/api/proyect.service';
import { range } from 'rxjs';
import { RefreshService } from '@shared/services/refresh/refresh.service';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.css'],
})
export class CardTasksComponent implements OnInit{
  @Output() delete = new EventEmitter<void>();
  @Input() workers:Array<ICoworker>
  @Input() task:ITask
  edit=false

  constructor(
    private proyectService: ProyectService,
    private refreshService: RefreshService
  ){
  }
  

  ngOnInit(): void {
    this.refreshService.refresh.subscribe(r=>{
      this.ngOnInit()
    })
    //console.log(this.workers)
    //let code = this.proyecto.coworker.find((persona:ICoworker)=>persona.license==="ADMIN")
//
    //this.proyectService.searchTasks(code!.id).subscribe(r=>{
    //  //for(let i=0; i< r.length; i++){
    //  //  this.task.push(r[i])
    //  //}
    //  this.task.push(r[0])
    //})
  }



  //searchWorkerForId(id:number){
  //  let person = this.proyecto.coworker.find((persona:ICoworker)=>persona.id===1)
  //  return person
  //}

  //agregarUser(task:ITask){
  //  let user = JSON.parse(localStorage.getItem("currentUserCatask")!).id
  //  let person = this.searchWorkerForId(user)
  //  let idProyecto = this.proyecto.id
  //  this.proyectService.addUserToTask(person!, idProyecto, this.proyecto.task).subscribe(r=>{
  //    console.log(r)
  //  })
//
  //}

  taskEdit(){
    //modalEdit.showModal()
    this.edit=true
    console.log('editando')
  }
  
  del(){
    this.delete.emit()
  }

}
