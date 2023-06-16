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
  my:any
  

  editForm!: FormGroup
  id:number
  user:Array<ICoworker> =[]
  workers:Array<ICoworker>

  constructor(
    private formBuilder:FormBuilder,
    private proyectService: ProyectService,
    private refreshService: RefreshService,
    private workersService: WorkersService
  ){
  }
  

  ngOnInit(): void {

    this.user = this.task.user

    this.workersService.workers$.subscribe(m=>{
      this.workers=m
    })

    this.refreshService.refresh.subscribe(r=>{
      this.ngOnInit()
    })

    this.editForm = this.formBuilder.group ({

      //poner las mismas variables
      admin: [this.workers.find((u:ICoworker)=>u.license==='ADMIN')!.id],
      name: [ `${this.task.name}`],
      description: [ `${this.task.description}`],
      date: [`${this.task.date}`] ,
      user:[``]
    })
    
    this.my = this.searchWorkerForId(JSON.parse(localStorage.getItem("currentUserCatask")!).id)
    if(this.task.user.find((u:ICoworker)=> u.id === this.my!.id)){
      this.colaborando=true
    }else{
      this.colaborando=false
    }
  }


  taskEdit(){
    this.edit=true
    console.log('editando')
  }
  
  del(){
    this.delete.emit()
  }

  agregarUser(task:ITask){
    if(this.colaborando===true){ //si no aparece como colaborador de la tarea se agrega, sino no

      this.task.user.forEach((element, index)=>{
        if(element === this.my){
          delete this.task.user[index];}
     })
      this.task.user.pop()

    }else{

      this.task.user.push(this.my!)
    }
    this.colaborando=!this.colaborando
    console.log(this.task.user)
    this.editForm.controls['user'].setValue(this.user)
    this.proyectService.editTask(this.task.id, this.editForm.value).subscribe()
    this.ngOnInit()
  }

  searchWorkerForId(id:number){
    let person = this.workers.find((persona:ICoworker)=>persona.id===id)
    return person
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
