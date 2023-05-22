import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as fromComponents from './components';
import * as fromPipes from './pipes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...fromComponents.components, ...fromPipes.pipes],
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
