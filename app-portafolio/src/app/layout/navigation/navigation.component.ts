import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { HideModalService } from '@shared/services/hide/hide-modal.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  @Output() enviar: EventEmitter<boolean> = new EventEmitter <boolean>();
  menuStatus: boolean = true
  logOutSubscription:any

  constructor(
    private authService: AuthService,
    private hideModalService:HideModalService,
    private router: Router
  ){}

  ngOnInit(): void {
    //this.hideModalService.hide.subscribe( r=>{
    //  if(this.menuStatus===true){
    //    this.userMenu()
    //  }
    //})
  }

    userMenu(){
    this.menuStatus = !this.menuStatus;
    this.enviar.emit(this.menuStatus)
    }

    logOut(){
      //TODO
      this.logOutSubscription = this.authService.logout().subscribe()
      this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN)
      
    }

    
  }





