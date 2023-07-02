import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@data/services/api/auth.service';
import { UserService } from '@data/services/api/user.service';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{
  public dateVar: number;
  public users: ICardUser[]; //= USERS_DATA;
  public userSubscription: any
  public user: {
    name: string;
    role: string;
    gender: 'M' | 'F'
  };

  my:any
  formProyect: FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService,
    private authService : AuthService
  ){
    this.dateVar = (new Date()).getTime(),
    this.user = {
      name: 'Laura',
      role: 'Admin',
      gender: 'F'
    }
  }

  

  /*OnInit se para cuadno tenemos logica luego 
  del constructor                              */ 

  async ngOnInit(){
    this.my = await this.getuser()

    this.getUsers()

    //this.formProyect = this.formBuilder.group({
    //  
    //  //editables
    //  name: [`${this.datosBase.name}`, [Validators.required, Validators.maxLength(20)]],
    //  age: [this.datosBase.age, [Validators.required, Validators.pattern((/^[0-9]*$/))]],
    //  description: [`${this.datosBase.description}`, [Validators.required, Validators.maxLength(18)]],
    //  gender: [`${this.datosBase.gender}`,[Validators.required]],
    //  info: [`${this.datosBase.info}`,  [Validators.required,Validators.maxLength(100)]],
    //  avatar:[`${this.datosBase.avatar}`, [Validators.required]],
//
    //  //no editables
    //  email: [`${this.datosBase.email}`]
    //})

  }

  getuser(){
    return this.authService.users().toPromise()
  }


  getUsers(){
    this.userSubscription = this.userService.getAllUser()
      .subscribe(r =>  this.users = (r.error) ? [] : r.data)
  }

  /*Desuscribirse de los servicios prara no 
  generar errores al cargar de nuevo el servicio*/ 

  ngOnDestroy(){
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

