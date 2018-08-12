import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    // ページタイトルを設定
    this.titleService.setTitle('有名Youtuber 商品レビュー まとめ - レビュコレ -');
  }

}
