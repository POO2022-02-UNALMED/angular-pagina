import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAutentificated, ICompleteUser } from '@data/interfaces';
import { BehaviorSubject, Observable, catchError, of, throwError, map, switchMap } from 'rxjs';
import { IresponseValidation } from '../iresponse-validation.metadata';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    return this.http.post<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_USERS.USERS, newData)
  }

  getByCode(email:any)
  : Observable <IresponseValidation>{
    const response = { error:true,msg:ERRORS_CONST.REGISTER.EMAIL, data:null}
    return this.http.get<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_USERS.USERS + '?email='+ email)
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
    const response = { error:true, msg:ERRORS_CONST.LOGIN.USER, data:null}
    return this.http.get<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_USERS.USERS + '?email='+ data.email)
    .pipe(
      map( r => {
        let dat:any = r

        //email existe? y contraseña conincide
        if (!(dat[0]=== undefined) && dat[0].password===data.password){
          response.data = dat[0]
          response.error = false
          response.msg = 'login succes'
          this.serUserToLocalStorage(dat[0]);
          this.currentUser.next(dat[0])
            
            
           
        }else{
          if(!(dat[0]=== undefined)){
            response.msg= ERRORS_CONST.LOGIN.PASSWORD
        }}
        
        return response;
      }),
      catchError( e =>{
        return of (response);
      })
    );
  }

  get getUser():Observable<ICompleteUser>{
    return this.currentUser.asObservable()
  }


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

  logout(email:number):Observable<any>{
    localStorage.removeItem(this.nameUserLS);
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN)
    return this.http.delete(API_ROUTES.DATA_LOGINS.LOGINS +'/'+ email)
    .pipe(
      map(r=>{
        console.log(r)
      })
    )
  }


  private serUserToLocalStorage( user:IApiUserAutentificated){
    console.log(user)
    localStorage.setItem(this.nameUserLS, JSON.stringify(user))
  }


  loginByEmail(data:any):Observable<IresponseValidation>{
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_TASK);
   const response = { error:true, msg:ERRORS_CONST.LOGIN.USER, data:null}
    return this.http.post<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_LOGINS.LOGINS, data)
  }


  obtenerLocalStorage(){
    return JSON.parse(localStorage.getItem("currentUserCatask")!)
  }

  editUser(newData:ICompleteUser): Observable <IresponseValidation>{
    const response = { error:true, msg:'No se completó el cambio', data:null}
    console.log(newData.id)
    return this.http.put<{error:boolean, msg: string, data: any}>(API_ROUTES.DATA_USERS.USERS + '/' + newData.id, newData)
    .pipe(
      map(r=>{
        let vari = r.data
        //this.serUserToLocalStorage()
        //this.currentUser.next(r.data)
        return response
      })
    )

  }





}

