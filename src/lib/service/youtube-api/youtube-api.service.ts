import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeApiService {

  constructor(
    private http:Http
  ) { }

  /**
   * YoutubeのAPIで関連動画のデータを取得
   * @param  {string} productName 商品名
   * @return {Observable<Response>} 関連動画
   */
  getRelatedVideos (productName: string) {
    // パラメータをセット
    const params = new URLSearchParams();
    params.set("keyword", productName);

    // サーバーサイドでAPIをたたき、動画情報を取得
    try {
      return this.http.get("api/youtube", { params })
      .map(res => res.json());
    } catch (e) {
      console.log(e.massage)
    }
  }
}
