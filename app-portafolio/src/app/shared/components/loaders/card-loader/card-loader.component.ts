import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.css']
})
export class CardLoaderComponent {

  // Input styles

  @Input() imageSize = 75;
  @Input() barHeight = 15;
  @Input() bars = 1;

  // Final properties

  public totalBars = [];
  public finalStyleImage = {};
  public finalStyleBar = {};



  // calcular barras con bucle for
  for (let: i = 0; i < this.bars; i++) {
    this.totalBars.push(i)
  }


}
