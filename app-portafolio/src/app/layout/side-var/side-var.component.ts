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


import { Component, Input, OnInit } from '@angular/core';
import { INTERNAL_PATHS } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
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
  
  errorMsg:string
  constructor(
    private authService : AuthService,
    private refreshService: RefreshService
  ){
  }

  async ngOnInit(){
    this.refreshService.navbar.subscribe(r=>{
      this.ngOnInit()
    })
    let mi = await this.getuser()
    if(mi.error){
      this.errorMsg=mi.message
     }else{
      this.datos=mi.data
     }
    //console.log("jas")
    //TODO    this.authService.getUser.subscribe(r=>{
    //      this.datos = r
    //      console.log("user",r)
    //    })
    
    //let email = JSON.parse(localStorage.getItem("currentUserCatask")!).email
    //this.authService.getByCode(email).subscribe(r=>{
    //  console.log(r)
    //  this.datos = r
    //})

   
    
  }
  
  getuser():Promise<IresponseValidation>{
    return this.authService.users().toPromise()
  }


  isAdmin(){
    if(this.datos.is_Admin){
      return true
    }else{
      return false
    }
  }

  role(){
    if(this.datos.is_Admin){
      return 'ADMIN'
    }else{
      return 'USER'
    }
  }
  
}

