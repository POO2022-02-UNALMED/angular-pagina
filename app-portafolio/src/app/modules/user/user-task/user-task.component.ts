import { Component, OnInit } from '@angular/core';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { IProyect } from '@shared/components/table/table.metadata';

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
    private userService: UserService
  ){
  }

  ngOnInit(): void {
    let work = JSON.parse(localStorage.getItem("currentUserCatask")!).work
    //traigo el proyecto en el que esta trabajando el usuario
    this.proyectService.traerProyecto(work).subscribe(r => {
      if (r.error===false){
        this.proyecto=r.data
        //recojo los id de compa;eros y busco sus usuarios para imprimir las tarjetas
        for(let i=0; i <this.proyecto.coworker.length; i++){
          this.userService.getUserById(this.proyecto.coworker[i].id).subscribe(r=>{
            this.completeUsers.push(r.data)
          })
        }
        this.exist=true
      }
      else{
        this.exist=false
      }
    })

  }

  ponerUsuarios(id:any){
  }


}
