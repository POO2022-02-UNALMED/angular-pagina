import { Injectable } from '@angular/core';
/*import { ApiClass } from '@data/schema/ApiClass.class';*/
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { Observable, from } from 'rxjs';
import { catchError, map  } from 'rxjs/operators';
import { of } from "rxjs";
import { environment } from 'environments/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { NONE_TYPE } from '@angular/compiler';
import { IresponseValidation } from '../iresponse-validation.metadata';
import { API_ROUTES } from '@data/constants/routes';
import { ICoworker } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Injectable({
  providedIn: 'root'
})
export class UserService /*extends ApiClass*/ {

  //APICLASS//
  public url = environment.url;
  public isProduction = environment.production

  constructor(private http:HttpClient){}

  error(error: HttpErrorResponse){    //mensaje de error
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else{
      errorMsg = `Error Code ${error.status}\nMessage:_${error.message}`;
    }
    return of({error:true, msg:errorMsg, data: null })
  }//CIERRA



  //TRAER USUARIOS SERVICE
  /**
   * Trae todos los usuarios de la api
   */
  getAllUser(): Observable<any>{
    const response = {error: false, msg: '', data: [] as ICoworker[]}
    return this.http.get<any>(API_ROUTES.DATA_USERS.USERS)
    .pipe(
      map( r => {
          response.data = r.data;
          response.error =r.error
          return response;
        }
      ),
      catchError(() => of(response))
      );
  };


  /**
   * Trae un usuario por id
   * @param id number
   */
  getUserById(id: number): Observable<{
    error:boolean,          
    msg:string,             
    data:ICardUser,
  }>{
    const response = {error: false, msg: '', data: null as any};
    return this.http.get<any>(API_ROUTES.DATA_USERS.USERS +'/'+ id)
    .pipe(
      map( r => {
        response.error = r.error;
        response.data = r.data;
        response.msg = r.message
        return response;
        }
      ),
      catchError(() => of(response))
      );
  };

  buscarCoworkers(idProyect:number):Observable<any>{
    const response = { error:true, message:'No tiene compañeros', data:null}
    return this.http.get<any>(API_ROUTES.DATA_USERS.USERS + '/'+ idProyect + '/coworkers')
    .pipe(
      map(r=>{
        response.error = r.error
        response.data = r.data
        response.message = r.message
        if (r.error===false){
          return r.data
        }else{
          return null
        }
      })
    )
  }

  

}
