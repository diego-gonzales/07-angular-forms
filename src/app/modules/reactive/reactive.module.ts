import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveRoutingModule } from './reactive-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveComponent } from './reactive.component';
import { ExampleComponent } from './pages/example/example.component';
import { Example1Component } from './pages/example1/example1.component';


@NgModule({
  declarations: [
    ReactiveComponent,
    ExampleComponent,
    Example1Component
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveModule { }
