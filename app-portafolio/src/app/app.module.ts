import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SideVarComponent } from './layout/side-var/side-var.component';
import { LoginComponent } from './layout/login/login.component';
import { AboutComponent } from './layout/about/about.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    NavigationComponent,
    SideVarComponent,
    LoginComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    // CORE

    FormsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }