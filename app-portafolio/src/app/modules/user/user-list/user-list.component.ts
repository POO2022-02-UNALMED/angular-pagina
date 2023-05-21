import { Component } from '@angular/core';
import { CAROUSEL_DATA } from '@data/constants/carousel.const';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { ICarouselItem } from '@shared/components/carousel/Icarousel-item.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  public users: ICardUser[]; //= USERS_DATA;
  public carouselData: ICarouselItem[] = CAROUSEL_DATA


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
