import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopRoutingModule }  from './top/top-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './top/top-routing.module#TopRoutingModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
