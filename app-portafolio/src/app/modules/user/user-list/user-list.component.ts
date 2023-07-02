import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { ProyectService } from '@data/services/api/proyect.service';
import { UserService } from '@data/services/api/user.service';
import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
import { ICoworker, IProyect, ITask } from '@shared/components/cards/card-tasks/card-tasks.metadata';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { WorkersService } from '@shared/services/workers/workers.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{
  public dateVar: number; 
  public users: ICoworker[]; //= USERS_DATA;  //todos los usarios para la lista
  public workers: ICoworker[]=[];  //usarios en el proyecto o sin proyecto para elegir
  public selected: ICoworker[]=[]  //usuarios elegidos
  public userSubscription: any;
  public tasks:Array<ITask>
  public user: {
    name: string;
    role: string;
    gender: 'M' | 'F'
  };

  my:any
  proyect:IProyect
  formProyect: FormGroup
  loader=false
  msg:string
  change:ITask

  constructor(
    private formBuilder : FormBuilder,
    private userService: UserService,
    private authService : AuthService,
    private proyectService:ProyectService,
    private router:Router
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
    let mi = await this.getuser()
    if(mi.error){
      this.msg=mi.message
     }else{
      this.my=mi.data
     }
    this.getUsers()

   let data = await this.getProyect()
   if(data.error){
    this.msg=data.message
   }else{
    this.proyect=data.data
   }

    this.users.forEach(element => {
      if(!element.id_Proyect || element.id_Proyect===this.my.id_Proyect){
        if(element.id!==this.my.id){
          this.workers.push(element)
        }
      }
    });

    this.users.forEach(element => {
      if(element.id_Proyect===this.my.id_Proyect){
        if(element.id!==this.my.id){
          this.selected.push(element)
        }
      }
    });
    let dat = await this.traerTareas()
    if(data.error){
      this.msg=dat!.message
    }else{
      this.tasks=dat!.data
    }

    this.formProyect = this.formBuilder.group({
      
      //editables
      name: [`${this.proyect.name}`, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: [`${this.proyect.description}`, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],

      
    })
    this.loader=true
  }

  traerTareas():Promise<IresponseValidation| undefined>{
    return this.proyectService.searchTasks(this.proyect.id).toPromise()
  }



  isSelected(worker:ICoworker):boolean{
      if(worker.id_Proyect===this.my.id_Proyect){
      return true
    }else{
      return false
    }

  }

  onSingup(formfield: string){
    if(this.formProyect.valid){
  
      return
    }else {
      this.validateAllFormFields(this.formProyect, formfield)
    } 
  }

  validateAllFormFields(formGroup: FormGroup, formfield: string){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        this.formProyect.controls[formfield].markAsDirty({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control, formfield)
      }
    })
  }

  autenticate() {
    this.formProyect.markAllAsTouched()
    if(this.formProyect.valid){
      //proyecto
      this.proyectService.editProyect(this.my.id_Proyect, this.formProyect.value).subscribe(r=>{
        if(r.error){
          this.msg=r.message
        }
      })
      

      //tareas
      this.selected.forEach(element => {
        if(element.id_Proyect!==this.my.id_Proyect){

          this.authService.editUser({id_Proyect:this.my.id_Proyect}, element.id).subscribe(r=>{
            if(r.error){
              this.msg=r.message
            }
          })
        }
      });
      this.workers.forEach(element => {
        if(element.id_Proyect===this.my.id_Proyect){
          if (this.selected.find((u:ICoworker)=> element.id===u.id)){
          }else{
            this.authService.editUser({id_Proyect:null}, element.id).subscribe(r=>{
              if(r.error){
                this.msg=r.message
              }
            })
            //TODO
            //entro a cada tarea
            this.tasks.forEach(task => {
              //entro a cada usuario de cada tarea
              task.users!.forEach((user,index) => {
                if(user.id===element.id){ //si encuentro que el usuario que voy a eliminar de proyecto esya en la tarea
                  let users= task.users //cojo la lista y le elimino el usuario y esa lista le hago put en api task
                  delete users[index];
                  users!.splice(index,1)
                  this.proyectService.editTask(task.id, {users:users}).subscribe(r=>{
                    if(r.error){
                      this.msg=r.message
                    }
                  })

                }
              });
            });

          }
        }
      });
      this.msg='Cambios guardados con exito'
      this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_TASK);
      }else {
      }
    }


  getuser():Promise<IresponseValidation>{
    return this.authService.users().toPromise()
  }

  getProyect():Promise<IresponseValidation>{
    return this.proyectService.traerProyecto(this.my.id_Proyect).toPromise()
  }


  getUsers(){
    this.userSubscription = this.userService.getAllUser()
      .subscribe(r =>  this.users = (r.error) ? [] : r.data)
  }

  recibir(user:ICoworker){
    if(this.selected.find((u:ICoworker)=>user.id===u.id)){
      this.selected.forEach((element, index)=>{
        if(element === user){
          delete this.selected[index];
          this.selected.splice(index,1)
        }
      })
     

    }else{
      this.selected.push(user)
    }
  }

  /*Desuscribirse de los servicios prara no 
  generar errores al cargar de nuevo el servicio*/ 

  ngOnDestroy(){
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

