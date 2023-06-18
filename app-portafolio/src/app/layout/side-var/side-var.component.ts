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


import { Component } from '@angular/core';
import { AuthService } from '@data/services/api/auth.service';
import { INTERNAL_PATHS } from '@data/constants/routes';

@Component({
  selector: 'app-side-var',
  templateUrl: './side-var.component.html',
  styleUrls: ['./side-var.component.css']
})
export class SideVarComponent {

  proyecto = INTERNAL_PATHS.PANEL_DEFAULT
  admin = INTERNAL_PATHS.PANEL_USER_LIST
  perfil = INTERNAL_PATHS.PANEL_USER_EDIT

  constructor(
    authService:AuthService
  ){
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

