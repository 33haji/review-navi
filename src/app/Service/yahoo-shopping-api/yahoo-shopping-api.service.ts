import { Injectable } from '@angular/core';
import { RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { appid } from './config/secret-config'
import 'rxjs/add/operator/map';

@Injectable()
export class YahooShoppingApiService {

  constructor(private _jsonp: Jsonp) { }

  /**
   * 商品レビュー検索APIをたたく
   * @return {Observable<Object>} 検索結果
   */
  reviewSearch() {
    // パラメータを設定
    // TODO 検索条件を調整する
    const searchParams = new URLSearchParams();
    searchParams.set('appid', appid);
    searchParams.set('jan', '4528620300127');
    searchParams.set('callback', 'JSONP_CALLBACK');

    // APIをたたく
    return this._jsonp
      .get('https://shopping.yahooapis.jp/ShoppingWebService/V1/json/reviewSearch', { search: searchParams })
      .map(res => res.json());
  }
}
