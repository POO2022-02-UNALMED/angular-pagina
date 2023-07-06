import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  imports: [HttpClientModule],
  providers: [
      AuthGuard,
      {
        provide:HTTP_INTERCEPTORS,
        useClass:JwtInterceptor,
        multi: true
      }
  ]
})
export class CoreModule { }
