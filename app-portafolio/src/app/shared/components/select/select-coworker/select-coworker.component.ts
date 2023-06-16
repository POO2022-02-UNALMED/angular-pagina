import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoworker } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-select-coworker',
  templateUrl: './select-coworker.component.html',
  styleUrls: ['./select-coworker.component.css']
})
export class SelectCoworkerComponent implements OnInit{
  @Output() enviar: EventEmitter<ICoworker> = new EventEmitter<ICoworker>;
  @Input() worker:ICoworker
  @Input() selected:boolean

  ngOnInit(): void {
    if(this.selected===undefined){
      this.selected=false
    }
  }

  selectWorker(){
    console.log('seleccionado')
    this.selected = !this.selected
    this.enviar.emit(this.worker)  
    
  }

}
