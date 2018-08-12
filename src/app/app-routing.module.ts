import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopRoutingModule }  from './top/top-routing.module';
import { ReviewsRoutingModule } from './reviews/reviews-routing.module'
import { YoutuberRoutingModule } from './youtuber/youtuber-routing.module'

const routes: Routes = [
  {
    path: '',
    loadChildren: './top/top-routing.module#TopRoutingModule'
  },
  {
    path: 'reviews',
    loadChildren: './reviews/reviews-routing.module#ReviewsRoutingModule'
  },
  {
    path: 'youtuber',
    loadChildren: './youtuber/youtuber-routing.module#YoutuberRoutingModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
