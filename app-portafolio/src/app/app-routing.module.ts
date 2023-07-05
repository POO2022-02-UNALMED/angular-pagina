import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { LoginComponent } from '@layout/login/login.component';
import { AuthGuard} from '@core/guards/auth.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';
import { INTERNAL_PATHS } from '@data/constants/routes';
import { AboutComponent } from '@layout/about/about.component';

const routes: Routes = [
  {
    path: INTERNAL_PATHS.AUTH_DEFAULT,
    component: LoginComponent,
    canActivate: [NoAuthGuard],
    loadChildren: ()=> 
    import ('@modules/auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path: INTERNAL_PATHS.PANEL_DEFAULT,
    component: SkeletonComponent,
    canActivate: [AuthGuard],
    loadChildren: ()=> 
    import ('@modules/user/user.module').then((m)=>m.UserModule)
  },
  {
    path: INTERNAL_PATHS.ABOUT_CONTACT,
    component: AboutComponent,
    //canActivate: [AuthGuard],
    loadChildren: ()=> 
    import ('@modules/about/about.module').then((m)=>m.AboutModule)
  },
  {
    path: '',
    redirectTo: INTERNAL_PATHS.AUTH_DEFAULT,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: INTERNAL_PATHS.AUTH_DEFAULT,
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
