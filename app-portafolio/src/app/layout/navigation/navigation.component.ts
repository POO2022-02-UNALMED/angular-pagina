import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Output()
  enviar: EventEmitter<boolean> = new EventEmitter <boolean>();
  menuStatus: boolean = true

  userMenu(){
    this.menuStatus = !this.menuStatus;
    this.enviar.emit(this.menuStatus)
    console.log(this.menuStatus)
    }
  }



