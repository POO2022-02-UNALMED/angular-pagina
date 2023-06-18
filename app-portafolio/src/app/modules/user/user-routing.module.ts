import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from '@core/guards/admin.guard';
//rutas
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: UserTaskComponent},
  {path: 'edit', component: UserEditComponent},
  {path: 'admin',canActivate: [Admin], component: UserListComponent},
  {path: ':id',canActivate: [Admin], component: UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
}
