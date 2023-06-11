import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Output()
  enviar: EventEmitter<boolean> = new EventEmitter <boolean>();
  menuStatus: boolean = true
  logOutSubscription:any

  constructor(
    private authService: AuthService
  ){}

  userMenu(){
    this.menuStatus = !this.menuStatus;
    this.enviar.emit(this.menuStatus)
    console.log(this.menuStatus)
    }

    logOut(){
      let id = this.authService.obtenerLocalStorage().id
      this.logOutSubscription = this.authService.logout(id).subscribe()
    }

    
  }





