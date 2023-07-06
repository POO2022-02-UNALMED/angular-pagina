import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICompleteUser } from '@data/interfaces';
import { AuthService } from '@data/services/api/auth.service';
import { IresponseValidation } from '@data/services/iresponse-validation.metadata';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { RefreshService } from '@shared/services/refresh/refresh.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnDestroy{
  public editSubscribe: any
  editPerfil: FormGroup
  datosBase:ICompleteUser

  errorMsg:string

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private refreshService : RefreshService
  ){}

  async ngOnInit(): Promise<void> {

    let my = await this.getuser()
    if(my.error){
      this.errorMsg=my.message
     }else{
      this.datosBase=my.data
     }

    this.editPerfil = this.formBuilder.group({
      
      //editables
      name: [`${this.datosBase.name}`, [Validators.required, Validators.maxLength(20)]],
      age: [this.datosBase.age, [Validators.required, Validators.pattern((/^[0-9]*$/))]],
      description: [`${this.datosBase.description}`, [Validators.required, Validators.maxLength(18)]],
      gender: [`${this.datosBase.gender}`,[Validators.required]],
      info: [`${this.datosBase.info}`,  [Validators.required,Validators.maxLength(100)]],
      avatar:[`${this.datosBase.avatar}`, [Validators.required]],

      //no editables
      email: [`${this.datosBase.email}`]
    })
  }

  getuser():Promise<IresponseValidation>{
    return this.authService.users().toPromise() 
  }

  onEdit(formfield: string){
    if(this.editPerfil.valid){
      return
    }else {
      this.validateAllFormFields(this.editPerfil, formfield)
    } 
  }

  validateAllFormFields(formGroup: FormGroup, formfield: string){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        this.editPerfil.controls[formfield].markAsDirty({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control, formfield)
      }
    })
  }

  autenticate() {
    this.editPerfil.markAllAsTouched()
      if(this.editPerfil.valid){
    //  this.authService.getByCode(this.editPerfil.value.email)!.subscribe( r=> {
    //    if (!r.error){
    //      this.registerSubscribe = this.authService.register(this.editPerfil.value).subscribe(r=>{
    //      })
    //    } else{
    //      this.editPerfil.controls['email'].setErrors({'incorrect': true})
    //     // this.msgError= r.msg
    //    }
    //  })
        
      this.editSubscribe = this.authService.editUser(this.editPerfil.value, this.datosBase.id!).subscribe(r=>{
        if(r.error){
          this.errorMsg=r.message
        }else{
          // aqui desencriptamos el email y el password para cambiar las cookies y que aparezcan los nuevos datos
          //const key='123'
          //const user={
          //  email: localStorage.getItem('email')!,
          //  password: crypto.AES.decrypt(localStorage.getItem('password')!, key).toString(crypto.enc.Utf8)
          //}
          //this.authService.logout().subscribe()
          //this.authService.login(user).subscribe(r=>{
          //  if(r.error){
          //    this.errorMsg=r.message
          //  }
          //})
          this.refreshService.navbar.emit()
        }
      })
        

    } else {
      //this.msgError= "*Formulario invalido. llene los espacios que se piden"
    }
  }

  recibir(imagen:any){
    this.editPerfil.controls['avatar'].setValue(imagen)
  }

  ngOnDestroy() {
    if (this.editSubscribe){
      this.editSubscribe.unsubscribe()
    }
  }
  
}