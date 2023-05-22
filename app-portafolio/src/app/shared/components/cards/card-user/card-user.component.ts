import { Component, Input } from '@angular/core';
import { ICardUser } from './card-user.metadata';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {
  @Input() data: ICardUser;


  constructor() { 
  }

}
