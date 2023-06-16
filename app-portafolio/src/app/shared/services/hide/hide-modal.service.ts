import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HideModalService {
  @Output() hide : EventEmitter<void> = new EventEmitter()

  constructor() { }
}
