/*
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ROUTES } from '@data/constants/routes';
import {Observable, throwError} from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router){}

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    //const token = localStorage.getItem('jwtToken'); // Obtén el token del almacenamiento local
        const
        return next.handle(request)
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('currentUserCatask'); // Obtén el token del almacenamiento local
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
