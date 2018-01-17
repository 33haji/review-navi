/*
 * Yahoo!ショッピングAPI
 */

import { Injectable } from '@angular/core';
import { RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { appid } from './config/secret-config'
import 'rxjs/add/operator/map';

@Injectable()
export class YahooShoppingApiService {

  constructor(private _jsonp: Jsonp) { }

  /**
   * 商品レビュー検索API
   * @return {Observable<Object>} 検索結果
   */
  async reviewSearch (janCodes: number[]) {
    let reviews: object[] = [];
    // janコードを利用して、各商品に対するレビューを取得する
    for (let jan of janCodes) {
      // パラメータを設定
      const searchParams = new URLSearchParams();
      searchParams.set('appid', appid);
      searchParams.set('jan', jan.toString());
      searchParams.set('callback', 'JSONP_CALLBACK');

      // APIをたたく
      let results: object[] = []
      this._jsonp
        .get('https://shopping.yahooapis.jp/ShoppingWebService/V1/json/reviewSearch', { search: searchParams })
        .map(res => res.json())
        .subscribe(data => {
          results = data.ResultSet.Result;
          reviews = reviews.concat(results);
        });
    }
    // 上記の処理が終わるまで1秒スリープする
    await new Promise(resolve => setTimeout(resolve, 1000));
    return reviews;
  }

  /**
   * 商品検索API
   * @param  {string} query     キーワード
   * @param  {number} priceFrom 最低価格
   * @param  {number} priceTo   最高価格
   * @param  {number} results   結果数
   * @return {[type]}           検索結果
   */
  itemSearch (query: string, priceFrom: number, priceTo: number, results: number) {
    // パラメータを設定
    const searchParams = new URLSearchParams();
    searchParams.set('appid', appid);
    searchParams.set('query', query || '');
    if (priceFrom) {
      searchParams.set('price_from', priceFrom.toString());
    }
    if (priceTo) {
      searchParams.set('price_to', priceTo.toString());
    }
    if (results) {
      searchParams.set('results', results.toString());
    }
    searchParams.set('callback', 'JSONP_CALLBACK');

    // APIをたたく
    return this._jsonp
      .get('https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch', { search: searchParams })
      .map(res => res.json());
  }
}
