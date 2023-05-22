import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {
  menuStatus: boolean = true


  recibirMsg(mensaje: boolean){
    this.menuStatus = mensaje
  }
}
