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

  constructor(
    private authService: AuthService
  ){}

  userMenu(){
    this.menuStatus = !this.menuStatus;
    this.enviar.emit(this.menuStatus)
    console.log(this.menuStatus)
    }

    logOut(){
      let email = this.obtenerLocalStorage().id
      this.authService.logout(email).subscribe()
    }

    obtenerLocalStorage(){
      console.log("holi", JSON.parse(localStorage.getItem("currentUserCatask")!))
      let user = JSON.parse(localStorage.getItem("currentUserCatask")!)
      return user
    }
  }





