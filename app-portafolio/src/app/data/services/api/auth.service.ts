import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAutentificated } from '@data/interfaces';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs';

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
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)!)
    );
   }

   get getUser(): IApiUserAutentificated{
      return this.currentUser.value
   }

  em: string = "holi";
  pas:string = "holiss"

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
      
      const response ={ error:true, msg:ERRORS_CONST.LOGIN.ERROR, data:null}
      return this.http.post<{error:boolean, msg: string, data: any}>(API_ROUTES.AUTH.LOGIN, data)
      .pipe(
        map( r => {
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
   
}
