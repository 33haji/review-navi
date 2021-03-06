// /*
//  * Yahoo!ショッピングAPI
//  */
//
// import { Injectable } from '@angular/core';
// import { RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// // ここに自分のappidを記載する(現在はこのAPIを使っていないのでコードもコメントアウト中)
// // import { appid } from './config/secret-config';
// import 'rxjs/add/operator/map';
//
// @Injectable()
// export class YahooShoppingApiService {
//
//   constructor(private _jsonp: Jsonp) { }
//
//   /**
//    * 商品レビュー検索API
//    * @return {Observable<Object>} 検索結果
//    */
//   async reviewSearch (janCodes: number[]) {
//     let reviews: object[] = [];
//     // janコードを利用して、各商品に対するレビューを取得する
//     for (let jan of janCodes) {
//       // パラメータを設定
//       const searchParams = new URLSearchParams();
//       // searchParams.set('appid', appid);
//       searchParams.set('jan', jan.toString());
//       searchParams.set('callback', 'JSONP_CALLBACK');
//
//       // APIをたたく
//       // TODO 全てのレビューが取れていないかも？
//       const itemReviews = await new Promise(resolve => {
//         let results: object[] = []
//         this._jsonp
//           .get('https://shopping.yahooapis.jp/ShoppingWebService/V1/json/reviewSearch', { search: searchParams })
//           .map(res => res.json())
//           .subscribe(data => {
//             results = results.concat(data.ResultSet.Result);
//           }, null, () => resolve(results));
//       });
//       reviews = reviews.concat(itemReviews);
//     }
//
//     return reviews;
//   }
//
//   /**
//    * 商品検索API
//    * @param  {string} query     キーワード
//    * @param  {number} priceFrom 最低価格
//    * @param  {number} priceTo   最高価格
//    * @param  {number} results   結果数
//    * @return {[type]}           検索結果
//    */
//   itemSearch (query: string, priceFrom: number, priceTo: number, results: number) {
//     // パラメータを設定
//     const searchParams = new URLSearchParams();
//     // searchParams.set('appid', appid);
//     searchParams.set('query', query || '');
//     if (priceFrom) {
//       searchParams.set('price_from', priceFrom.toString());
//     }
//     if (priceTo) {
//       searchParams.set('price_to', priceTo.toString());
//     }
//     if (results) {
//       searchParams.set('results', results.toString());
//     }
//     searchParams.set('callback', 'JSONP_CALLBACK');
//
//     // APIをたたく
//     return this._jsonp
//       .get('https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch', { search: searchParams })
//       .map(res => res.json());
//   }
// }
