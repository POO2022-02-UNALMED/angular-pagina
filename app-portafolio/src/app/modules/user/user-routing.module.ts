import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserTaskComponent } from './user-task/user-task.component';

const routes: Routes = [
  {path: 'admin', component: UserListComponent},
  {path: ':id', component: UserDetailComponent},
  {path: '', component: UserTaskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
}
