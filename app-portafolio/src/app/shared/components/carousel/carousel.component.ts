import { Component, Input, OnInit } from '@angular/core';
import { ICarouselItem } from './Icarousel-item.metadata';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() items : ICarouselItem[] = []
  @Input() indicators = true;
  @Input() controls = true;

  selectedIndex = 0

  constructor() {

  }

  ngOnInit() {
        this.items.map( (i ) => {
          if (i.title != null) {
          }else{
            i.title = {
              first: '',
              second: ''
            }
          }
          
        });
        this.items.map((i) => {
          if (i.subtitle != null) {            
          }else{
            i.subtitle = ''
          }
        })
    }

  selectImage(index: number): void {
    this.selectedIndex = index
  }

  onPrevClick(){
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.items.length - 1;
    }
    else {
      this.selectedIndex --;
    }
  }

  onNextClick (){
    if (this.selectedIndex === this.items.length-1 ) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex ++;
    }
  }

  llevaSubtitulo(){
    var subtit = '';
    subtit = this.items.find(i => i.id === this.selectedIndex + 1)!.subtitle!
    console.log(subtit)
    return subtit
  }
  
  llevaTitulo1(){
    var tit = '';
    tit = this.items.find(i => i.id === this.selectedIndex + 1)!.title!.first
    console.log(tit)
    return tit
  }

  llevaTitulo2(){
    var tit = '';
    tit = this.items.find(i => i.id === this.selectedIndex + 1)!.title!.second
    console.log(tit)
    return tit
  }
  hola(){
    console.log('holi')
  }
}

//  @Input() height = 500;
//  @Input() isFullScreen = false;
//  @Input() items : ICarouselItem[] = []
//
//  public finalHeight: string | number = 0;
//  public currentPosition = 0
//
//  constructor() {
//      this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`; 
//      
//  }
//
//  ngOnInit() {
//      this.items.map( (i, index ) => {
//        i.id = index;
//        i.marginLeft = 0;
//      });
//  }
//
//  setCurrentPosition(position: number) {
//    this.currentPosition = position;
//    this.items.find(i => i.id === 0)!.marginLeft = -100 * position; //con ! indicamos q a pesar de estar indefinido va a tenener valor
//  }                                                                   // se le quita 10 a la posicion para que se muevan seguidas en forma de carrusel 
//
//  setNext(){
//    let finalPercentage = 0;
//    let nextPosition = this.currentPosition + 1;
//    if (nextPosition <= this.items.length - 1) {
//      finalPercentage = -100 * nextPosition
//    } else {
//      nextPosition = 0;   
//    }
//    this.items.find(i => i.id ===0)!.marginLeft = finalPercentage;
//    this.currentPosition = nextPosition;
//  }
//
//  setBack(){
//    let finalPercentage = 0;
//    let backPosition = this.currentPosition - 1;
//    if (backPosition >= 0) {
//      finalPercentage = -100 * backPosition;
//    } else {
//      backPosition = this.items.length - 1;   
//      finalPercentage = -100 * backPosition; 
//    }
//    this.items.find(i => i.id ===0)!.marginLeft = finalPercentage;
//    this.currentPosition = backPosition;
//  }
//
//}



