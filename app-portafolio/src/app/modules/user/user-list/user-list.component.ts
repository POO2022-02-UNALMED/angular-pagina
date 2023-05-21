import { Component } from '@angular/core';
import { USERS_DATA } from '@data/constants/user.constant';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  public users: ICardUser[]; //= USERS_DATA;

  constructor(
    private userService: UserService
  ){
    this.userService.getAllUser().subscribe(r => {
      if (!r.error){
        this.users = r.data;
      }  
    })
  }
}
