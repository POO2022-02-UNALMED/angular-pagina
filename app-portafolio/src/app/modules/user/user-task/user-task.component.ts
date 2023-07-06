import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
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
  task:boolean =true
  zero:boolean 
  cargado=false

  errorMsg:string

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

    let mi = await this.getuser()
    if(mi.error){
      this.errorMsg=mi.message
     }else{
      this.user=mi.data
     }
    if (this.user.id_Proyect!==null){
      let res = await this.traerProyect(this.user.id_Proyect)
      if(res.error){
        this.errorMsg=res.message
      }else{
        this.proyecto=res.data
      }
      
      if(this.proyecto!==null){
        this.proyecto.coworker = await this.buscarCoworkers()
        this.completeUsers = this.proyecto.coworker
        this.workersService.setWorker$(this.proyecto.coworker)
        this.exist=true
        let res = await this.traerTareas()
        if(res.error){
          this.errorMsg=res.message
        }else{
          this.tasks=res.data
          if(this.tasks.length!==0){
            this.zero=false
          }else{
            this.zero=true
          }
        }
      }else{
        this.exist= false
      }
    }
    

    this.refreshService.refresh.subscribe(r=>{
    })
    this.cargado=true
  }

  getuser():Promise<IresponseValidation>{
    return this.authService.users().toPromise()
  }

  traerProyect(work:number):Promise<IresponseValidation>{
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
