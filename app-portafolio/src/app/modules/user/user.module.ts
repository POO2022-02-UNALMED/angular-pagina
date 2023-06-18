import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { UserTaskComponent } from './user-task/user-task.component';
import { UserEditComponent } from './user-edit/user-edit.component'


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserTaskComponent,
    UserEditComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
