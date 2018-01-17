import { Component, OnInit } from '@angular/core';
import { YahooShoppingApiService } from './../../../lib/service/yahoo-shopping-api/yahoo-shopping-api.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'reviews-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [YahooShoppingApiService]
})
export class IndexComponent implements OnInit {

  // レビューの情報
  reviews: object[];
  // レビューの平均点
  reviewAvg: number;

  constructor(
    private _yahooShoppingApiService: YahooShoppingApiService
  ) { }

  async ngOnInit() {
    // Yahoo商品検索APIの結果を取り出す
    const yahooItemSearchResult: object[] = JSON.parse(localStorage.getItem('yahooItemSearchResults')) || [];

    // 検索結果の商品のレビュー平均値と先頭10商品のJANコードを取得
    let reviewSum = 0;
    let janCodes: number[] = []
    let count = 0
    for (let i in yahooItemSearchResult) {
      if (yahooItemSearchResult[i]['Review']) {
        // レビューの計算
        if (+yahooItemSearchResult[i]['Review'].Rate > 0) {
          reviewSum += +yahooItemSearchResult[i]['Review'].Rate;
          count++;
        }
        // JANコードを格納
        if (yahooItemSearchResult[i]['JanCode'] && janCodes.length < 10) {
          janCodes.push(yahooItemSearchResult[i]['JanCode']);
        }
      }
    }
    // レビューの平均値を算出
    this.reviewAvg = reviewSum / count;

    // Yahoo商品レビューAPIからレビュー情報を取得する
    this.reviews = await this._yahooShoppingApiService.reviewSearch(janCodes);
    console.dir(this.reviews);
  }

}
