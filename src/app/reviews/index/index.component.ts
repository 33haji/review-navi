import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WebScrapingService } from './../../../lib/service/web-scraping/web-scraping.service';

@Component({
  selector: 'reviews-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [WebScrapingService]
})
export class IndexComponent implements OnInit {

  // 対象商品の情報
  productInfo: {
    image: string,
    name: string,
    maker: string
  };
  // レビューの情報
  reviews: object[] = [];
  // レビューの平均点
  reviewAvg: number;

  constructor(
    private _webScrapingService: WebScrapingService
  ) {}

  ngOnInit() {
    // 対象の商品情報を取りだす
    const productInfoFull: object[] = JSON.parse(localStorage.getItem('productInfo')) || [];

    // 表示する商品情報を格納
    this.productInfo = {
      image: productInfoFull['mediumImageUrl'],
      name: productInfoFull['productName'],
      maker: productInfoFull['makerName']
    };

    // レビューの平均値を算出
    this.reviewAvg = productInfoFull['reviewAverage'];

    // レビュー情報を取得(WEBスクレイピング)
    this._webScrapingService.scrapingReviewsInfo(productInfoFull['reviewUrlPC'])
  }

}
