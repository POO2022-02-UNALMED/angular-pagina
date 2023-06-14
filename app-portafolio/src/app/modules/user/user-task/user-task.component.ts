import { Component, OnInit } from '@angular/core';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { ICoworker, IProyect } from '@shared/components/cards/card-tasks/card-tasks.metadata'
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit{

  proyecto:IProyect
  tasks:any
  exist:boolean
  completeUsers:any = []

  constructor(
    private proyectService: ProyectService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    let work = JSON.parse(localStorage.getItem("currentUserCatask")!).work
    //traigo el proyecto en el que esta trabajando el usuario

    this.proyectService.traerProyecto(work).subscribe(r => {
      if (r.error===false){
        this.proyecto=r.data
        //recojo los id de compa;eros y busco sus usuarios para imprimir las tarjetas
        //for(let i=0; i <this.proyecto.coworker.length; i++){
        //  this.userService.getUserById(this.proyecto.coworker[i].id).subscribe(r=>{
        //    this.completeUsers.push(r.data)
        //  })
        //}
        this.exist=true
        let code = this.proyecto.coworker.find((persona:ICoworker)=>persona.license==="ADMIN")

        this.proyectService.searchTasks(code!.id).subscribe(r=>{
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

  addTask(){
    let form={
      admin: 5,
      fecha: "2023/06/13",
      name: "Ir al polo norte",
      user: [this.searchWorkerForId(JSON.parse(localStorage.getItem("currentUserCatask")!).id)]
    }
    this.proyectService.addTask(form).subscribe(r=>{
      console.log(r)
      this.ngOnInit();
    })
  }

  reload() {
    this.ngOnInit;
    }


}
