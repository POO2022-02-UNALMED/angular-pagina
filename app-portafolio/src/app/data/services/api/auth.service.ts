import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAutentificated, ICompleteUser } from '@data/interfaces';
import { BehaviorSubject, Observable, catchError, of, throwError, map, switchMap } from 'rxjs';
import { IresponseValidation } from '../iresponse-validation.metadata';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService{ plainText:string;  
  key='123'

  public currentUser: BehaviorSubject<ICompleteUser>
  public nameUserLS = 'currentUserCatask'
  constructor(
    private http: HttpClient,
    private router: Router
  ){

    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)!)
    );
  }


  //login 

  login(data: {
    email: string;
    password: string;
  })
  :Observable <IresponseValidation>{
  const response = { error:true, message:ERRORS_CONST.LOGIN.USER, data:null}
  return this.http.post<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/login', data, {withCredentials:true})
  .pipe(
  map( r=>{
    response.message = r.message
    if (r.message === 'succes'){
      response.data=r.data
      response.error=r.error
      this.serUserToLocalStorage(r.data);
      this.currentUser.next(r.data)
      localStorage.setItem('password', crypto.AES.encrypt(data.password, this.key).toString())
      localStorage.setItem('email', data.email)
      //console.log('esta',crypto.AES.decrypt(pass, this.key).toString(crypto.enc.Utf8)) 
      this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_TASK);
    }
    return response;
  }), 
  )}


  //register

  register(dataRegister:{
    name:string;
    email: string;
    password: string;
  })
  :Observable <any>{
  const response = { error:true, message:ERRORS_CONST.LOGIN.USER, data:null}
  return this.http.post<{error:boolean, message: string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/register', dataRegister)
  .pipe(
  map( r=>{
    response.message = 'success'
    response.data=r.data
    response.error=r.error
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
    return response;
    }),
    catchError( e =>{
      response.message='No se pudo regisrar, use otro email'
      return of (response);
    }),
  )}

  admin(idProyect:number, id:number){
    const newData={
      id_Proyect: idProyect
    }
    this.http.put<{error:boolean, message: string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/' + id, newData)
  }
  

  logout():Observable<any>{
    const response = { error:true, message:ERRORS_CONST.LOGIN.USER, data:null}
    localStorage.removeItem(this.nameUserLS);
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    return this.http.post(API_ROUTES.DATA_USERS.USERS +'/logout', {}, {withCredentials:true})
    .pipe(
      map(r=>{
        //this.cookieSvc.delete('UserAutenticado')
      }),
      catchError( e =>{
        response.message='Hubo un error'
        return of (response);
      })
    )
  }

  // set user
  private serUserToLocalStorage( user:IApiUserAutentificated){
    localStorage.setItem(this.nameUserLS, JSON.stringify(user))
  }


  //user

  user():Observable<IresponseValidation>{
    const response = { error:true, message:ERRORS_CONST.LOGIN.USER, data:null}
    return this.http.get<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/user' , {withCredentials:true})
    .pipe(
      map( r=>{
          return r
        }
      ),
      catchError( e =>{
        response.message='Hubo un error'
        return of (response);
      })
    )
  }

  //guard
  obtenerLocalStorage(){
    return JSON.parse(localStorage.getItem("currentUserCatask")!)
  }


  //edit user

  editUser(newData:ICompleteUser, id:number): Observable <IresponseValidation>{
    const response = { error:true, message:'No se completó el cambio', data:null}
    return this.http.put<{error:boolean, message: string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/' + id, newData)
    .pipe(
      map(r=>{
        response.error=false
        response.message='succes'
        return response
      }),
      catchError( e =>{
        response.message='Hubo un error en el usuario'
        return of (response);
      })
    )

  }


  //get allusers

  users():Observable <any>{
    const response = { error:true, message:'No se encontro el usuario', data:null}
    return this.http.get<any>(API_ROUTES.DATA_USERS.USERS + '/user', {withCredentials:true})
    .pipe(
      map(r=>{
        response.error=false
        response.message='Peticion correcta'
        response.data=r
        
        return response
      }),
      catchError( e =>{
        response.message='Hubo un error'
        return of (response);
      })
    )
  }


}

