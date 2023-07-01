import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { ICoworker, IProyect, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata'
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { WorkersService } from '@shared/services/workers/workers.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit, OnDestroy{
  user :any
  proyecto:IProyect

  tasks:Array<ITask>
  exist:boolean
  completeUsers:any = []
  task:boolean = true

  //suscripciones

  displaySubscription:any

  constructor(
    private proyectService: ProyectService,
    private userService: UserService,
    private refreshService: RefreshService,
    private workersService: WorkersService,
    private authService:AuthService
  ){
  }
  

  async ngOnInit() {
    
    this.refreshService.refresh.subscribe(r=>{
      this.ngOnInit()
    })

    this.user = await this.getuser()
    if (this.user.id_Proyect!==null){
      this.proyecto = await this.traerProyect(this.user.id_Proyect)
      if(this.proyecto!==null){
        this.proyecto.coworker = await this.buscarCoworkers()
        this.completeUsers = this.proyecto.coworker
        this.workersService.setWorker$(this.proyecto.coworker)
        this.exist=true
        this.tasks = await this.traerTareas()
      }
    }
    //console.log('los coworkers son', this.completeUsers)
    

    this.refreshService.refresh.subscribe(r=>{
    })
  }

  getuser():Promise<ICardUser>{
    return this.authService.users().toPromise()
  }

  traerProyect(work:number):Promise<IProyect>{
    return this.proyectService.traerProyecto(work).toPromise()
  }

  buscarCoworkers():Promise<ICoworker[]>{
    return this.userService.buscarCoworkers(this.user.id_Proyect).toPromise()
  }

  traerTareas():Promise<any>{
    return this.proyectService.searchTasks(this.proyecto.id).toPromise()
  }
  

  //ponerUsuarios(id:any){
  //}

  //searchWorkerForId(id:number){
  //  let person = this.proyecto.coworker.find((persona:ICoworker)=>persona.id===1)
  //  return person
  //}

  replace(){
    this.task = !this.task
    this.ngOnInit()
  }

  ngOnDestroy(): void {
    if (this.displaySubscription){
      this.displaySubscription.unsubscribe()
    }
  }
}
