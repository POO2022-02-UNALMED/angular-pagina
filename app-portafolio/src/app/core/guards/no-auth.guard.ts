import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { Observable } from 'rxjs';
import { AuthService } from '@data/services/api/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const currentUser= this.authService.obtenerLocalStorage()
      if(currentUser){
        this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_LIST);
        return false
      }

      return true
  }
};
