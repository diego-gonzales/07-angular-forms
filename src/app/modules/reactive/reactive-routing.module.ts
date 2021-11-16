import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveComponent } from './reactive.component';
import { ExampleComponent } from './pages/example/example.component';
import { Example1Component } from './pages/example1/example1.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveComponent,
    children: [
      {
        path: 'example',
        component: ExampleComponent
      },
      {
        path: 'example1',
        component: Example1Component
      },
      {
        path: '**',
        redirectTo: 'example'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
