import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAutentificated } from '@data/interfaces';
import { BehaviorSubject, Observable, catchError, of, throwError, map, switchMap } from 'rxjs';
import { IresponseValidation } from '../iresponse-validation.metadata';

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

    //this.currentUser = new BehaviorSubject(
    //  JSON.parse(localStorage.getItem(this.nameUserLS)!)
    //);
    
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
          //cuenta activa?
          if(dat[0].isActive=== true){
            response.data = dat[0]
            response.error = false
            response.msg = 'login succes'
            this.serUserToLocalStorage(dat[0]);
            this.currentUser.next(dat[0])
            
            
           } else{
            response.msg= ERRORS_CONST.LOGIN.ACTIVE
           }
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


  


   get getUser(): IApiUserAutentificated{
      return this.currentUser.value
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

  logout(email:any):Observable<any>{
    localStorage.removeItem(this.nameUserLS);
    //this.currentUser.next(null);
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN)
    return this.http.delete(API_ROUTES.DATA_LOGINS.LOGINS +'/'+ email) 
  }


  private serUserToLocalStorage( user:IApiUserAutentificated){
    localStorage.setItem(this.nameUserLS, JSON.stringify(user))
  }

  loginByEmail(data:any):Observable<IresponseValidation>{
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_TASK);
    //this.router.navigateByUrl("/task")
   // console.log(data)
   const response = { error:true, msg:ERRORS_CONST.LOGIN.USER, data:null}
    return this.http.post<{error:boolean, msg:string, data: any}>(API_ROUTES.DATA_LOGINS.LOGINS, data)
  }

  //loginByEmail1(credentials:ILogin):Observable<IResponse | void>{
  //  const error = null
  //  const response = this.http.get<IResponse>(API_ROUTES.USERS.LOGIN).pipe(
  //    catchError(this.handleError)
  //  )
  //  return response
  //}

  obtenerLocalStorage(){
    return JSON.parse(localStorage.getItem("currentUserCatask")!)
  }

}

