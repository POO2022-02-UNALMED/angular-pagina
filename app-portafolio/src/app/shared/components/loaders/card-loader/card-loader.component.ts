import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.css']
})
export class CardLoaderComponent implements OnInit {

  // Input styles

  @Input() imageSize = 75;
  @Input() barHeight = 15;
  @Input() bars = 1;

  // Final properties

  public totalBars: {width: string}[] = [];
  public finalStyleImage = {};
  public finalHeightBar = '0';

  constructor(){
  }

  ngOnInit() {

    // calcular barras con bucle for
  
    for (let i = 0; i < this.bars; i++) {
      const widthRandom = Math.floor(Math.random() * (100 - 60)) + 60;
      this.totalBars.push({width: `${widthRandom}%`});
    }

    // calcular ancho de la imagen de carga

    this.finalStyleImage = {
      width: `${this.imageSize}px`,
      height: `${this.imageSize}px`
    }

    // calcular style barras

    this.finalHeightBar = `${this.barHeight}px`
    
    

  }
  
}

