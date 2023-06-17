import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy{
  public users: ICardUser[];
  public currentUser?: ICardUser;
  public id: number;
  public detailSubscribe: any

  constructor(
    private userServices: UserService,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.id = id
    //this.id = this.route.snapshot.params['id']//toma el id de la ruta ya que es localhost:400/id
    //this.currentUser = this.users.find(user => user.id === +this.id);  //encontrar un user que cumpla que la id buscada sea a la propiedad id
    //console.log(this.currentUser)
  }

  ngOnInit(): void {
    this.getUser()
  }

  
  
  

  getUser(){
    this.detailSubscribe = this.userServices
    .getUserById(this.id)
    .subscribe(r => {
      if(!r.error){
        this.currentUser = r.data
      }
    })
  }

  ngOnDestroy(): void {
    if (this.detailSubscribe){
      console.log('unsuscribe')
      this.detailSubscribe.unsubscribe()
    }
  }

}