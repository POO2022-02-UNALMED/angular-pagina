import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@data/services/api/auth.service';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { ICoworker, IProyect } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{
  public dateVar: number;
  public users: ICoworker[]; //= USERS_DATA;
  public nextCoworker: ICoworker[];
  public userSubscription: any;
  public user: {
    name: string;
    role: string;
    gender: 'M' | 'F'
  };

  my:any
  proyect:IProyect
  formProyect: FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService,
    private authService : AuthService,
    private proyectService:ProyectService
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

   this.proyect = await this.getProyect()

    console.log(this.proyect)
    this.formProyect = this.formBuilder.group({
      
      //editables
      name: [`${this.proyect.name}`, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: [`${this.proyect.description}`, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],

      
    })

  }

  onSingup(formfield: string){
    if(this.formProyect.valid){
  
      return
    }else {
      //this.validateAllFormFields(this.registerTask, formfield)
    } 
  }

  getuser(){
    let users = this.authService.users().toPromise()
    return users
  }

  getProyect(){
    return this.proyectService.traerProyecto(this.my.id_Proyect).toPromise()
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

