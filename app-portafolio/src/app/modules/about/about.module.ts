import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CommonModule } from '@angular/common';
import { AboutContactComponent } from './about-contact/about-contact.component';
import { AboutInfoComponent } from './about-info/about-info.component';
import { AboutNewsComponent } from './about-news/about-news.component';
import { AboutRoutingModule } from './about-routing.module';



@NgModule({
  declarations: [
    AboutContactComponent,
    AboutInfoComponent,
    AboutNewsComponent
  ],
  imports: [
    SharedModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
