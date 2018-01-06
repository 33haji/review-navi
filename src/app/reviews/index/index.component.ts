import { Component, OnInit } from '@angular/core';
import { YahooShoppingApiService } from './../../../lib/service/yahoo-shopping-api/yahoo-shopping-api.service';
import { Observable } from 'rxjs/Rx';

class Reviews {
  public total: number  // 検索数HIT数
  public start: number  // 最初のデータが何個目にあたるか
  public result: Array<Object>  // レビュー検索結果

  constructor(
    private _total: number,
    private _start: number,
    private _result: Array<Object>
  ) {
    this.total = _total;
    this.start = _start;
    this.result = _result;
  }
}

@Component({
  selector: 'reviews-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [YahooShoppingApiService]
})
export class IndexComponent implements OnInit {

  // レビューの情報
  reviews: Reviews;

  constructor(
    private _yahooShoppingApiService: YahooShoppingApiService
  ) { }

  ngOnInit() {
    // 商品レビューAPIからレビュー情報を取得する
    this._yahooShoppingApiService.reviewSearch().subscribe(data => {
      this.reviews = new Reviews(
        data.ResultSet.totalResultsAvailable,
        data.ResultSet.firstResultPosition,
        data.ResultSet.Result
      );
    });
  }

}
