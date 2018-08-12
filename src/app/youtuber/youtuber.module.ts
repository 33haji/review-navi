import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutuberRoutingModule } from './youtuber-routing.module';
import { IndexComponent } from './index/index.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    CommonModule,
    YoutuberRoutingModule
  ],
  declarations: [IndexComponent, ReviewsComponent]
})
export class YoutuberModule { }
