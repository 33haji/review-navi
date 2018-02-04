/*
 * 楽天DevelopersAPI
 */

import { Injectable } from '@angular/core';
import { RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { appid } from './config/secret-config'  // ← ここに自分のappidを記載する
import 'rxjs/add/operator/map';

@Injectable()
export class RakutenApiService {

  constructor(private _jsonp: Jsonp) { }

  /**
   * 商品価格ナビ製品検索API
   * @param  {string} keyword  キーワード
   * @param  {number} minPrice 最低価格
   * @param  {number} maxPrice 最高価格
   * @return {[type]}          検索結果
   */
  productSearch (keyword: string, minPrice: number, maxPrice: number) {
    // パラメータを設定
    const searchParams = new URLSearchParams();
    searchParams.set('applicationId', appid);
    searchParams.set('keyword', keyword || '');
    if (minPrice) {
      searchParams.set('minPrice', minPrice.toString());
    }
    if (maxPrice) {
      searchParams.set('maxPrice', maxPrice.toString());
    }
    searchParams.set('callback', 'JSONP_CALLBACK');

    // APIをたたく
    const version = '20170426'
    return this._jsonp
      .get(`https://app.rakuten.co.jp/services/api/Product/Search/${version}`, { search: searchParams })
      .map(res => res.json());
  }
}
