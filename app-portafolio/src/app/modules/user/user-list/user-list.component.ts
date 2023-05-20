import { Component } from '@angular/core';
import { USERS_DATA } from '@data/constants/user.constant';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  public users: ICardUser[] = USERS_DATA;

}
