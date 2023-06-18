//import { Component } from '@angular/core';
//
//@Component({
//  selector: 'app-side-var',
//  templateUrl: './side-var.component.html',
//  styleUrls: ['./side-var.component.css']
//})
//export class SideVarComponent {
//
//
//}


import { Component, OnInit } from '@angular/core';
import { INTERNAL_PATHS } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { RefreshService } from '@shared/services/refresh/refresh.service';

@Component({
  selector: 'app-side-var',
  templateUrl: './side-var.component.html',
  styleUrls: ['./side-var.component.css']
})
export class SideVarComponent implements OnInit{

  proyecto = INTERNAL_PATHS.PANEL_DEFAULT
  admin = INTERNAL_PATHS.PANEL_USER_LIST
  perfil = INTERNAL_PATHS.PANEL_USER_EDIT
  datos:any

  constructor(
    private authService : AuthService,
    private refreshService: RefreshService
  ){
  }

  ngOnInit(): void {
    this.authService.getUser.subscribe(r=>{
      this.datos = r
      console.log("user",r)
    })
    
    //let email = JSON.parse(localStorage.getItem("currentUserCatask")!).email
    //this.authService.getByCode(email).subscribe(r=>{
    //  console.log(r)
    //  this.datos = r
    //})

    //this.refreshService.refresh.subscribe(r=>{
    //  console.log('se recibio el msj')
    //  this.ngOnInit()
    //})
    
    console.log(this.datos)
  }

  datosUser(){
    return  JSON.parse(localStorage.getItem("currentUserCatask")!)
  }

  isAdmin(){
    if(JSON.parse(localStorage.getItem("currentUserCatask")!).license==='ADMIN'){
      return true
    }else{
      return false
    }
  }
  
}

