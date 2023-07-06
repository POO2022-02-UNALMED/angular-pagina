import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoworker, IProyect, ITask } from './card-tasks.metadata';
import { ProyectService } from '@data/services/api/proyect.service';
import { range } from 'rxjs';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkersService } from '@shared/services/workers/workers.service';
import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.css'],
})
export class CardTasksComponent implements OnInit{
  @Output() delete = new EventEmitter<void>();
  @Input() task:ITask
  edit=false
  colaborando:boolean
  @Input() my:any
  
  errorMsg:string
  editForm!: FormGroup
  id:number
  user:Array<number> =[]
  workers:Array<ICoworker>

  constructor(
    private formBuilder:FormBuilder,
    private proyectService: ProyectService,
    private refreshService: RefreshService,
    private workersService: WorkersService,
    private authService: AuthService
  ){
  }
  

  ngOnInit(): void {

    this.task.users.forEach((element, index)=>{
      this.user.push(element.id)
    })

    this.workersService.workers$.subscribe(m=>{
      this.workers=m
    })

    this.refreshService.refresh.subscribe(r=>{
      this.ngOnInit()
    })

    this.editForm = this.formBuilder.group ({

      //poner las mismas variables
      //name: [ `${this.task.name}`],
      //description: [ `${this.task.description}`],
      //date: [`${this.task.date}`] ,
      users:[``]
    })

    
    if(this.task.users.find((u:ICoworker)=> u.id === this.my!.id)){
      this.colaborando=true
    }else{
      this.colaborando=false
    }
    
  }

  taskEdit(){
    this.edit=true
  }
  
  del(){
    this.delete.emit()
  }

  getuser():Promise<IresponseValidation>{
    return this.authService.users().toPromise()
  }

  async agregarUser(task:ITask){
    /* VER SI ESTA EN LA TAREA Y EL PROYECTO Y LUEGO CONTINUAR CON LA EDICION*/

    let mi = await this.getuser()
    if(mi.error){
     }else{
      if(mi.data.id_Proyect===this.task.id_Proyect){
        if(this.colaborando === true){ //si no aparece como colaborador de la tarea se agrega, sino no
          this.user.forEach((element, index)=>{
            if(element === this.my.id){
              this.user.splice(index,1);}
          })
          this.task.users.forEach((element, index)=>{
            if(element.id === this.my.id){
              this.task.users.splice(index,1);}
          })
         //this.task.users.pop()
          
    
        }if(this.colaborando === false){
         
          this.user.push(this.my!.id)
          this.task.users.push(this.my!)
        }
    
    
        this.editForm.controls['users'].setValue(this.user)
        this.proyectService.editTask(this.task.id, {users:this.editForm.controls['users'].value}).subscribe(r=>{
          if(r.error){
            this.errorMsg=r.message
          }else{
            this.colaborando=!this.colaborando
          }
        })
      }else{
        this.errorMsg='ya no participas en el proyecto'
      }

      
      this.proyectService.editTask(this.task.id, {users:this.my.id})
    }

    
    //comprobar si la tarea sigue activa
    //this.proyectService.searchTasks(this.task.id_Proyect).subscribe(r=>{
    //  if(r.data.find((tarea:any) => (tarea.id ===this.task.id))){
    //    r.data.forEach((element:ITask, index:number) => {
    //      console.log('aki')
    //      if(element.id === this.task.id ){ //existe la tarea
    //        console.log('aki')
    //        if(this.editForm.controls['users'].value===true){
    //          this.proyectService.editTask(this.task.id, {users:this.editForm.controls['users'].value}).subscribe(r=>{
    //            if(r.error){
    //              this.errorMsg=r.message
    //            }else{
    //              this.colaborando=!this.colaborando
    //            }
    //          })
    //        }else{
    //          if(element.chek==true){
    //            this.editForm.controls['users'].setValue(this.user)
    //            this.proyectService.editTask(this.task.id, {users:this.editForm.controls['users'].value}).subscribe(r=>{
    //              if(r.error){
    //                this.errorMsg=r.message
    //              }else{
    //                this.colaborando=!this.colaborando
    //              }
    //            })
    //          }else{
    //            this.errorMsg='esta tarea ya esta terminada'
    //          }
    //        }
    //      }
    //      })
//
    //console.log('datos',this.task.users, this.user)
    //this.ngOnInit()
  //}})
}


  searchWorkerForId(id:number){
    let person = this.workers.find((persona:ICoworker)=>persona.id===id)
    return person
  }

  chek(){
    
  }
}



  //agregarUser(task:ITask){
  //  let user = JSON.parse(localStorage.getItem("currentUserCatask")!).id
  //  let person = this.searchWorkerForId(user)
  //  let idProyecto = this.proyecto.id
  //  this.proyectService.addUserToTask(person!, idProyecto, this.proyecto.task).subscribe(r=>{
  //    console.log(r)
  //  })
//
  //}
