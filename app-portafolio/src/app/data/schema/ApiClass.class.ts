import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'environments/environment';
import { of } from 'rxjs';

export class ApiClass {
    public url = environment.url;
    public isProduction = environment.production
  
    constructor(private http:HttpClient){}
  
    error(error: HttpErrorResponse){
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = error.error.message;
      }else{
        errorMsg = `Error Code ${error.status}\nMessage:_${error.message}`;
      }
      //return of({error:true, msg:errorMsg, data: null })
      return of({error:true, msg:errorMsg, data: null })
    }
                        
}

