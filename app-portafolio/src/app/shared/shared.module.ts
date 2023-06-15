import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as fromComponents from './components';
import * as fromPipes from './pipes';
import { RouterModule } from '@angular/router';
import { SelectImgComponent } from './components/select/select-img/select-img.component';
import { SelectCoworkerComponent } from './components/select/select-coworker/select-coworker.component';

@NgModule({
  declarations: [...fromComponents.components, ...fromPipes.pipes, SelectImgComponent, SelectCoworkerComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    ...fromComponents.components,
    ...fromPipes.pipes
  ]
})
export class SharedModule { }
