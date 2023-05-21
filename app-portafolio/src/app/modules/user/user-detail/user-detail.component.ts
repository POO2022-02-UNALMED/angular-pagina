import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
public users: ICardUser[];
public currentUser?: ICardUser;
public id: number;

constructor(
  private userServices: UserService,
  private route: ActivatedRoute
) {
  this.id = this.route.snapshot.params['id']; //toma el id de la ruta ya que es localhost:400/id
  //this.currentUser = this.users.find(user => user.id === +this.id);  //encontrar un user que cumpla que la id buscada sea a la propiedad id
  console.log(this.currentUser)
  this.userServices.getUserById(this.id).subscribe(r => {
    if(!r.error){
      console.log(this.currentUser = r.data)//this.currentUser = r.data
    }
  })
  
}


}
