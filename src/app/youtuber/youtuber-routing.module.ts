import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: [IndexComponent, ReviewsComponent]
})
export class YoutuberRoutingModule { }
