import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '../carousel-edit/Icarousel-item.metadata';
import { CAROUSEL_DATA } from '@data/constants/carousel.const';

@Component({
  selector: 'app-carousel-users',
  templateUrl: './carousel-users.component.html',
  styleUrls: ['./carousel-users.component.css']
})
export class CarouselUsersComponent implements OnInit {


items= CAROUSEL_DATA

ngOnInit(): void {
  console.log(this.items)
}


}
