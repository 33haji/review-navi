import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    maker: string,
    url: string,
    minPrice: string,
    maxPrice: string
  };
  // レビューの情報
  reviews: object[] = [];
  // レビューの平均点
  reviewAvg: number;
  // 総ページ数
  pageTotal: number;
  // 現在のページ数
  page: number;
  // 連番表示用の配列
  pageTotalArr: number[];

  constructor(
    private _webScrapingService: WebScrapingService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // 対象の商品情報を取りだす
    const productInfoFull: object[] = JSON.parse(localStorage.getItem('productInfo')) || [];

    // 表示する商品情報を格納
    this.productInfo = {
      image: productInfoFull['mediumImageUrl'],
      name: productInfoFull['productName'],
      maker: productInfoFull['makerName'],
      url: productInfoFull['affiliateUrl'],
      minPrice: productInfoFull['minPrice'].toLocaleString(),
      maxPrice: productInfoFull['maxPrice'].toLocaleString()
    };

    // レビューの平均値を算出
    this.reviewAvg = productInfoFull['reviewAverage'];

    // パラメータを取得
    const params = this._activatedRoute.snapshot.queryParams;
    this.page = params.page ? parseInt(params.page) : 1;

    // レビュー情報を取得(WEBスクレイピング)
    const url = `${productInfoFull['reviewUrlPC']}${this.page}`
    this._webScrapingService.scrapingReviewsInfo(url)
    .subscribe(data => {
      this.reviews = data.reviews;
      this.pageTotal = Number(data.pageInfo.totalPage);
      this.pageTotalArr = new Array(this.pageTotal);
    }, null, null);
  }

}
