import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAutentificated } from '@data/interfaces';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { map } from 'rxjs';

import { ILogin } from '@data/interfaces'
import { IResponse } from '@data/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<IApiUserAutentificated>
  public nameUserLS = 'currentUserCatask'
  constructor(
    private http: HttpClient,
    private router: Router
  ) {

   // this.currentUser = new BehaviorSubject(
   //   JSON.parse(localStorage.getItem(this.nameUserLS)!)
   // );
    
   }

   get getUser(): IApiUserAutentificated{
      return this.currentUser.value
   }

  login(
    data: {
      email: string;
      password: string;
    }
    ): Observable <{
        error: boolean;
        msg: string;
        data: any
    }> {
      
      const response = { error:true, msg:ERRORS_CONST.LOGIN.ERROR, data:null}
      return this.http.post<{error:boolean, msg: string, data: any}>(API_ROUTES.USERS.LOGIN, data)
      .pipe(
        map( r => {
          console.log(response.data)
          console.log(r.data)
          console.log(response.msg)
          response.msg = r.msg;
          response.error = r.error
          response.data = r.data
          this.serUserToLocalStorage(r.data);
          this.currentUser.next(r.data);
          if (!response.error) {
            this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_LIST);
          }
          return response;
        }),
        catchError( e =>{
          return of (response);
        })
      );
    }

    logout() {
      localStorage.removeItem(this.nameUserLS);
      this.currentUser.next(null as any);
      this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN) 
    }


  private serUserToLocalStorage( user:IApiUserAutentificated){
    localStorage.setItem(this.nameUserLS, JSON.stringify(user))
  }

  //loginByEmail(authData:ILogin):Observable<IResponse | void>{
  //  return this.http.post<IResponse>(API_ROUTES.AUTH.LOGIN, authData).pipe(
  //    map( (res:IResponse) => {
  //      console.log('res:', res)
  //      this.saveToken(res.token)
  //      //token
  //    }), 
  //    catchError ((err) => this.handleError(err))
  //  )
  //}

  loginByEmail(credentials:ILogin):Observable<IResponse | void>{
    const error = null
    const response = this.http.get<IResponse>(API_ROUTES.USERS.LOGIN).pipe(
      catchError(this.handleError)
    )
    return response
  }

  private saveToken(token:string): void{
    localStorage.setItem('token', token);
  }

  private handleError(error: HttpErrorResponse){
    if (error.status ===0){
      console.error('se ha producido un error', error.error);
    } else{
      console.error('Backend retorno codigo de estado', error.status, error.error);
    }
    return throwError(()=> new Error('algo fallo, intente de nuevo.'))
  }

}
