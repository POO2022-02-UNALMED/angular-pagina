import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IresponseValidation } from '../iresponse-validation.metadata';
import { API_ROUTES } from '@data/constants/routes';

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

    addUserToTask(idUser:number, idProyecto:number,idTask:number):Observable<IresponseValidation>{
      const response= {error:true, msg:'No se pudo unir al proyecto', data:null}
      return this.http.post<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_PROYECTS.PROYECTS + `${idTask}` + :)
      // TODO TERMINAR EL SERVICIO
    }

}
