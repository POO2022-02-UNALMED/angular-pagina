import { Component, Input, OnInit } from '@angular/core';
import { ICardUser, Licencias } from './card-user.metadata';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit{
  @Input() data: ICardUser;
  @Input() fromTask:boolean

  admin:boolean

  constructor() {
  }

  ngOnInit(): void {
    if(this.data.is_Admin){
      this.admin=true
    } else{
      this.admin=false
    }
    
  }



}
