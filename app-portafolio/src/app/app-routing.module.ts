import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { LoginComponent } from '@layout/login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    loadChildren: ()=> 
    import ('@modules/auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path: 'panel',
    component: SkeletonComponent,
    //canActivate: [AuthGuard],
    loadChildren: ()=> 
    import ('@modules/user/user.module').then((m)=>m.UserModule)
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
