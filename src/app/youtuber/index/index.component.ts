import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { youtuber } from '../data/youtuber';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // Youtuber
  youtuber: object[];

  constructor(
    private titleService: Title
  ) {
    this.youtuber = youtuber;
  }

  ngOnInit() {
    // ページタイトルを設定
    this.titleService.setTitle('有名Youtuber 商品レビュー まとめ - レビュコレ -');
  }

}
