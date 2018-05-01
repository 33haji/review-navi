/*
 * 楽天DevelopersAPI
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RakutenApiService {

  constructor(
    private http: Http
  ) { }

  /**
   * 楽天のAPIで検索条件に合ったアイテムを取得
   * @param  {string}   keyword  キーワード
   * @param  {string[]} genreIds ジャンルID群
   * @return {Observable<Response>} アイテムリスト
   */
  productSearch (keyword: string, genreIds: string[]) {
    // パラメータを設定
    const params = new URLSearchParams();
    params.set('keyword', keyword);
    params.set('genreIds', genreIds.join(','));

    // サーバーサイドでAPIをたたき、アイテム情報を取得
    try {
      return this.http.get("api/rakuten", { params })
      .map(res => res.json());
    } catch (e) {
      console.log(e.massage)
    }
  }

  /**
   * "productId"でアイテムを検索する
   * @param  {string} productId
   * @return {Observable<Response>}
   */
  findByProductId (productId: string) {
    // パラメータを設定
    const params = new URLSearchParams();
    params.set('productId', productId);

    // サーバーサイドでAPIをたたき、アイテム情報を取得
    try {
      return this.http.get("api/rakuten/productId", { params })
      .map(res => res.json());
    } catch (e) {
      console.log(e.massage)
    }
  }
}
