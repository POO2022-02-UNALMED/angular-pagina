import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from '@core/guards/admin.guard';
import { AboutContactComponent } from './about-contact/about-contact.component';
import { AboutInfoComponent } from './about-info/about-info.component';
import { AboutNewsComponent } from './about-news/about-news.component';

//rutas
//import { UserListComponent } from './user-list/user-list.component';
//import { UserDetailComponent } from './user-detail/user-detail.component';
//import { UserTaskComponent } from './user-task/user-task.component';
//import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: AboutContactComponent},
  {path: 'contact', component: AboutContactComponent},
  {path: 'info', component: AboutInfoComponent},
  {path: 'news', component: AboutNewsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { 
}
