import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IresponseValidation } from '../iresponse-validation.metadata';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { ICoworker, IProyect, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    traerProyecto(id:any):Observable<IresponseValidation>{
      const response= {error:true, msg:'No tienes proyecto', data:null}
      return this.http.get<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_PROYECTS.PROYECTS + '?id=' + id)
      .pipe(
        map( r => {
          let dat:any = r
          if (!(dat[0]=== undefined)){
            response.error=false
            response.data=dat[0]
            response.msg="proyecto cargado"
          }
          return response
        })
      )
    }


    addUserToTask(worker:ICoworker, idProyecto:number,task:any):Observable<any>{
      return this.http.get<ITask>(API_ROUTES.DATA_PROYECTS.PROYECTS + '?task=' + task + '?id=' + idProyecto)
    }
    //addUserToTask(idUser:number, idProyecto:number,idTask:number):Observable<Array<IProyect>>{
    //  this.http.get<Array<IProyect>>(API_ROUTES.DATA_PROYECTS.PROYECTS + '?id=' + idProyecto)
    //  .pipe(
    //    switchMap((r:any)=>{
    //      let task = r[0].task
    //      console.log( r)
    //      
    //      
    //      return r
    //    })
    //  )
    //  // TODO TERMINAR EL SERVICIO
    //}

    searchTasks(id:number):Observable<Array<ITask>>{
      return this.http.get<Array<ITask>>(API_ROUTES.DATA_TASK.TASKS + '?admin=' + id)
    }


    addTask(data:any):Observable<any>{
      return this.http.post(API_ROUTES.DATA_TASK.TASKS, data)
      .pipe(
        map(r=>{
          return r
        })
      )
    }

    deleteTask(task:ITask):Observable<any>{
      return this.http.delete(API_ROUTES.DATA_TASK.TASKS + '/' + task.id)
      .pipe(
        map(r=>{
        })
      )
    }

    editTask(id:number, task:ITask):Observable<any>{
      return this.http.put(API_ROUTES.DATA_TASK.TASKS + '/' + id, task)
    }

    //reloadComponent():Observable<any>{
    //  
    //}

}
