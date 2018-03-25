import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitterApiService {

  constructor(
    private http: Http
  ) { }

  /**
   * TwitterのAPIで関連ハッシュタグのツイートを取得
   * @param  {string} productName 商品名
   * @return {Observable<Response>} 関連ツイート
   */
  getHashtagTweet (productName: string) {
    // パラメータをセット
    const params = new URLSearchParams();
    params.set("hashtagKeyword", productName);

    // サーバーサイドでAPIをたたき、ツイートを取得
    try {
      return this.http.get("api/twitter", { params })
      .map(res => res.json());
    } catch (e) {
      console.log(e.massage)
    }
  }
}
