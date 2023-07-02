import { Component, Input, OnInit } from '@angular/core';
import { ICardUser, Licencias } from './card-user.metadata';
import { Router } from '@angular/router';
import { ICoworker } from '../card-tasks/card-tasks.metadata';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit{
  @Input() data: ICoworker;
  @Input() fromTask:boolean

  admin:boolean

  constructor(
    private router : Router
  ) {
  }

  ngOnInit(): void {
    if(this.data.is_Admin){
      this.admin=true
    } else{
      this.admin=false
    }
    
  }
  url(dat:number){
    if(this.fromTask){
      return ''
    }else{
      this.router.navigateByUrl('/panel/'+ String(dat))
    }
  }



}
