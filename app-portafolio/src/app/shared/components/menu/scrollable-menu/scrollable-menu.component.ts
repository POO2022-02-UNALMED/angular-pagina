import { Component, Input } from '@angular/core';
import { ICoworker } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-scrollable-menu',
  templateUrl: './scrollable-menu.component.html',
  styleUrls: ['./scrollable-menu.component.css']
})

export class ScrollableMenuComponent {
  @Input() workers:Array<ICoworker>

  



}
