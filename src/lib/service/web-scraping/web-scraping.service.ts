/*
 *  WEBスクレイピング
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebScrapingService {

  constructor(
    private http: Http
  ) { }

  /**
   * 楽天のレビュー情報をスクレイピングによって取得
   * @param  {string} url スクレイピング対象のURL
   * @return {Observable<Response>} レビュー情報
   */
  scrapingReviewsFromRakuten (url: string) {
    // パラメータをセット
    const params = new URLSearchParams();
    params.set("url", url);

    // スクレイピングを行い、レビュー情報を返す
    try {
      return this.http.get("api/scraping/rakuten", { params })
      .map(res => res.json());
    } catch (e) {
      console.log(e.massage)
    }
  }
}
