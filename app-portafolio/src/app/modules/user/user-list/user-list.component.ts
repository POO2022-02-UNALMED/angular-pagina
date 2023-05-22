import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CAROUSEL_DATA } from '@data/constants/carousel.const';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { ICarouselItem } from '@shared/components/carousel/Icarousel-item.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{
  public users: ICardUser[]; //= USERS_DATA;
  public carouselData: ICarouselItem[];
  public userSubscription: any


  constructor(
    private userService: UserService
  ){
    this.carouselData = CAROUSEL_DATA
  }
  

  /*OnInit se para cuadno tenemos logica luego 
  del constructor                              */ 

  ngOnInit(){
    this.getUsers()
  }


  getUsers(){
    this.userSubscription = this.userService
      .getAllUser()
      .subscribe(r =>  this.users = (r.error) ? [] : r.data)
  }

  /*Desuscribirse de los servicios prara no 
  generar errores al cargar de nuevo el servicio*/ 

  ngOnDestroy(){
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

