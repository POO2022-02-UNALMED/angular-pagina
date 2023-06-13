import { Component, Input } from '@angular/core';
import { ProyectService } from '@data/services/api/proyect.service';
import { ICoworker, IProyect } from './table.metadata';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() proyecto:IProyect

  constructor(
  ){
  }


  buscarPersonaPorId(id:number){
    let person = this.proyecto.coworker.find((person:ICoworker)=>person.id===id)
    return person
  }

}
