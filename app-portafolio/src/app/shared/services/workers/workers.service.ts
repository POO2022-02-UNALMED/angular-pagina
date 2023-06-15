import { EventEmitter, Injectable, Output } from '@angular/core';
import { ICoworker } from '@shared/components/cards/card-tasks/card-tasks.metadata';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  @Output () workers: EventEmitter<Array<ICoworker>> = new EventEmitter()

  constructor() { }
}
