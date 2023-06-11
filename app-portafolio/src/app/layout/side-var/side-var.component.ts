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

@Component({
  selector: 'app-side-var',
  templateUrl: './side-var.component.html',
  styleUrls: ['./side-var.component.css']
})
export class SideVarComponent {

  

  constructor(
    authService:AuthService
  ){
  }

  datosUser(){
    return  JSON.parse(localStorage.getItem("currentUserCatask")!)
  }

  
}

