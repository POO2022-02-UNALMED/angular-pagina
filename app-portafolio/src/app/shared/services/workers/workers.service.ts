import { EventEmitter, Injectable, Output } from '@angular/core';
import { ICoworker } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const initCoworker:Array<ICoworker> =[

]

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  private coworkers$ = new BehaviorSubject<Array<ICoworker>>(initCoworker)
  get workers$():Observable<Array<ICoworker>>{
    return this.coworkers$.asObservable()
  }

  setWorker$(workers:Array<ICoworker>): void{
    this.coworkers$.next(workers)
  }

  
  @Output () workers: EventEmitter<any> = new EventEmitter()

  constructor() { }
}
