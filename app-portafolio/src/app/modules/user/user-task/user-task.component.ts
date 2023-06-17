import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { ICoworker, IProyect } from '@shared/components/cards/card-tasks/card-tasks.metadata'
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { WorkersService } from '@shared/services/workers/workers.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit, OnDestroy{

  proyecto:IProyect
  tasks:any
  exist:boolean
  completeUsers:any = []
  task:boolean = true
  admin:boolean = false

  //suscripciones

  displaySubscription:any

  constructor(
    private proyectService: ProyectService,
    private userService: UserService,
    private refreshService: RefreshService,
    private workersService: WorkersService,
  ){}

  ngOnInit(): void {

    this.refreshService.refresh.subscribe(r=>{
      this.ngOnInit()
    })



    let work = JSON.parse(localStorage.getItem("currentUserCatask")!).work
    if(JSON.parse(localStorage.getItem("currentUserCatask")!).license === 'ADMIN'){
      this.admin=true
    }

    //traigo el proyecto en el que esta trabajando el usuario

    this.proyectService.traerProyecto(work).subscribe(r => {
      if (r.error===false){
        this.proyecto=r.data

        this.workersService.setWorker$(this.proyecto.coworker)


        //recojo los id de compa;eros y busco sus usuarios para imprimir las tarjetas
        for(let i=0; i <this.proyecto.coworker.length; i++){
          this.userService.getUserById(this.proyecto.coworker[i].id).subscribe(r=>{
            this.completeUsers.push(r.data)
          })
        }
        this.exist=true
        let code = this.proyecto.coworker.find((persona:ICoworker)=>persona.license==="ADMIN")  

        this.proyectService.searchTasks(code!.id).subscribe(r=>{
          //this.componentService.envio.emit(code!.id)
          //for(let i=0; i< r.length; i++){
          //  this.task.push(r[i])
          //}
        this.tasks=r
        })
      }
      else{
        this.exist=false
      }


    })
  }


  ponerUsuarios(id:any){
  }

  searchWorkerForId(id:number){
    let person = this.proyecto.coworker.find((persona:ICoworker)=>persona.id===1)
    return person
  }

  replace(){
    this.task = !this.task
    console.log(this.task)
  }

  ngOnDestroy(): void {
    if (this.displaySubscription){
      this.displaySubscription.unsubscribe()
    }
  }
}
