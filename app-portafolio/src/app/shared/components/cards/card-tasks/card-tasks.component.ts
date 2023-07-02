import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICoworker, IProyect, ITask } from './card-tasks.metadata';
import { ProyectService } from '@data/services/api/proyect.service';
import { range } from 'rxjs';
import { RefreshService } from '@shared/services/refresh/refresh.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkersService } from '@shared/services/workers/workers.service';

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
    private workersService: WorkersService
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
      name: [ `${this.task.name}`],
      description: [ `${this.task.description}`],
      date: [`${this.task.date}`] ,
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

  agregarUser(task:ITask){
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
    this.colaborando=!this.colaborando
    
    this.editForm.controls['users'].setValue(this.user)
    this.proyectService.editTask(this.task.id, this.editForm.value).subscribe(r=>{
      if(r.error){
        this.errorMsg=r.message
      }
    })
    //console.log('datos',this.task.users, this.user)
    //this.ngOnInit()
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
