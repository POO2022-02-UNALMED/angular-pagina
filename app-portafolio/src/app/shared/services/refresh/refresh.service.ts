import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  @Output() refresh : EventEmitter<void> = new EventEmitter()

  constructor() { }
}
