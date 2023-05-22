import { Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements AfterViewInit{
  public menuStatus: boolean = true
  public isLoading = true
  public loadingImg = 'assets/images/loading/loading.gif'

  // se inicia cuando toda la informacion de la pantalla carga
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
    
  }
  

  recibirMsg(mensaje: boolean){
    this.menuStatus = mensaje
  }
}
