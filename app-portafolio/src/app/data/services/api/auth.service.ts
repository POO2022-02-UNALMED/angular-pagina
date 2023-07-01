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


  

  //register

  register(dataRegister: {
    firstName:string;
    lastName:String;
    email: string;
    password: string;
  }): Observable <IresponseValidation>{
    const newData= {
      name: `${dataRegister.firstName} ${dataRegister.lastName}`,
      email: dataRegister.email,
      password: dataRegister.password,
      isActive: false
    }
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN)
    return this.http.post<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_USERS.USERS, newData)
  }

  getByCode(email:any)
  : Observable <IresponseValidation>{
    const response = { error:true,message:ERRORS_CONST.REGISTER.EMAIL, data:null}
    return this.http.get<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_USERS.USERS + '?email='+ email)
    .pipe(
      map( r => {
        let dat:any = r
        if (dat[0]=== undefined){
          response.error=false
        }else{
          response.data=dat[0]
        }
        return response;
      }),
      catchError( e =>{
        return of (response);
      })
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
      response.error=false
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

  //login(data: {
  //      email: string;
  //      password: string;
  //    })
  //:Observable <IresponseValidation>{
  //  const response = { error:true, msg:ERRORS_CONST.LOGIN.USER, data:null}
  //  return this.http.get<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_USERS.USERS + '?email='+ data.email)
  //  .pipe(
  //    map( r => {
  //      let dat:any = r
//
  //      //email existe? y contraseña conincide
  //      if (!(dat[0]=== undefined) && dat[0].password===data.password){
  //        response.data = dat[0]
  //        response.error = false
  //        response.msg = 'login succes'
  //       this.serUserToLocalStorage(dat[0]);
  //        this.currentUser.next(dat[0])
  //          
  //          
  //         
  //      }else{
  //        if(!(dat[0]=== undefined)){
  //          response.msg= ERRORS_CONST.LOGIN.PASSWORD
  //      }}
  //      
  //      return response;
  //    }),
  //    catchError( e =>{
  //      return of (response);
  //    })
  //  );
  //}
//
  //get getUser():Observable<ICompleteUser>{
  //  return this.currentUser.asObservable()
  //}


  //login(
  //  data: {
  //    email: string;
  //    password: string;
  //  }
  //  ): Observable <{
  //      error: boolean;
  //      msg: string;
  //      data: any
  //  }> {
  //    
  //    const response = { error:true, msg:ERRORS_CONST.LOGIN.ERROR, data:null}
  //    return this.http.post<{error:boolean, msg: string, data: any}>(API_ROUTES.USERS.LOGIN, data)
  //    .pipe(
  //      map( r => {
  //        response.msg = r.msg;
  //        response.error = r.error
  //        response.data = r.data
  //        this.serUserToLocalStorage(r.data);
  //        this.currentUser.next(r.data);
  //        if (!response.error) {
  //          this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_LIST);
  //        }
  //        return response;
  //      }),
  //      catchError( e =>{
  //        return of (response);
  //      })
  //    );
  //  }

  

  logout():Observable<any>{
    localStorage.removeItem(this.nameUserLS);
    //this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN)
    return this.http.post(API_ROUTES.DATA_USERS.USERS +'/logout', {}, {withCredentials:true})
    .pipe(
      map(r=>{
        //this.cookieSvc.delete('UserAutenticado')
      })
    )
  }


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
        },
        catchError( e =>{
          response.message='not logged'
          return of (response);
        })),
        
    )
  }

  //loginByEmail(data:any):Observable<IresponseValidation>{
  //  this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_TASK);
  // const response = { error:true, msg:ERRORS_CONST.LOGIN.USER, data:null}
  //  return this.http.post<{error:boolean, message:string, data: any}>(API_ROUTES.DATA_LOGINS.LOGINS, data)
  //}


  obtenerLocalStorage(){
    return JSON.parse(localStorage.getItem("currentUserCatask")!)
  }

  editUser(newData:ICompleteUser, id:number): Observable <IresponseValidation>{
    const response = { error:true, message:'No se completó el cambio', data:null}
    console.log(newData.id)
    return this.http.put<{error:boolean, message: string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/' + id, newData)
    .pipe(
      map(r=>{
        response.error=false
        response.message='succes'
        return response
      })
    )

  }


  users():Observable <any>{
    const response = { error:true, message:'No se encontro el usuario', data:null}
    
    return this.http.get<any>('http://localhost:3000/auth/user', {withCredentials:true})
    .pipe(
      map(r=>{
        response.error=false
        response.message='peticion correcta'
        response.data=r
        
        return r
      })
    )
  }


}

