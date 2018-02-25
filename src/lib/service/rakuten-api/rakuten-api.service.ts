/*
 * 楽天DevelopersAPI
 */

import { Injectable } from '@angular/core';
import { RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { appid, affiliateId } from './config/secret-config'  // ← ここに自分のappidを記載する
import 'rxjs/add/operator/map';

@Injectable()
export class RakutenApiService {

  constructor(private _jsonp: Jsonp) { }

  /**
   * 商品価格ナビ製品検索API
   * @param  {string}   keyword    キーワード
   * @param  {string[]} genreIds   ジャンルID
   * @return {[type]}              検索結果
   */
  async productSearch (keyword: string, genreIds: string[]) {
    let prouducts: object[] = [];
    genreIds = genreIds && genreIds.length ? genreIds : ['']
    // パラメータを設定
    const searchParams = new URLSearchParams();
    searchParams.set('applicationId', appid);
    searchParams.set('affiliateId', affiliateId);
    searchParams.set('keyword', keyword || '');
    searchParams.set('callback', 'JSONP_CALLBACK');
    const version = '20170426';

    // カテゴリーの要素数分だけループさせる
    for (let genreId of genreIds) {
      searchParams.set('genreId', genreId);

      // APIをたたく
      const resultProducts = await new Promise(resolve => {
        let results: object[] = [];
        this._jsonp
          .get(`https://app.rakuten.co.jp/services/api/Product/Search/${version}`, { search: searchParams })
          .map(res => res.json())
          .subscribe(data => {
            results = results.concat(data.Products);
          }, null, () => resolve(results));
      });
      prouducts = prouducts.concat(resultProducts);
    }

    return prouducts;
  }
}
