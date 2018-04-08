import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { WebScrapingService } from './../../../lib/service/web-scraping/web-scraping.service';
import { TwitterApiService } from './../../../lib/service/twitter-api/twitter-api.service';
import { YoutubeApiService } from './../../../lib/service/youtube-api/youtube-api.service';

@Component({
  selector: 'reviews-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [WebScrapingService, TwitterApiService, YoutubeApiService]
})
export class IndexComponent implements OnInit {

  // 対象商品の情報
  productInfo: {
    image: string,
    name: string,
    maker: string,
    url: string,
    minPrice: string,
    maxPrice: string
  };
  // レビューの情報
  reviews: object[] = [];
  // レビューの平均点
  reviewAvg: number;
  // 総ページ数
  pageTotal: number;
  // 現在のページ
  page: number;
  // 連番表示用の配列
  pageTotalArr: number[];
  // 関連ツイート
  tweets: object[] = [];
  // 関連動画
  videos: object[] = [];
  // 現在のtab
  tab: string = 'review';

  constructor(
    private _webScrapingService: WebScrapingService,
    private _twitterApiService: TwitterApiService,
    private _youtubeApiService: YoutubeApiService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // 対象の商品情報を取りだす
    const productInfoFull: object[] = JSON.parse(localStorage.getItem('productInfo')) || [];

    // 表示する商品情報を格納
    this.productInfo = {
      image: productInfoFull['mediumImageUrl'],
      name: productInfoFull['productName'],
      maker: productInfoFull['makerName'],
      url: productInfoFull['affiliateUrl'],
      minPrice: productInfoFull['minPrice'].toLocaleString(),
      maxPrice: productInfoFull['maxPrice'].toLocaleString()
    };

    // レビューの平均値を算出
    this.reviewAvg = productInfoFull['reviewAverage'];

    // パラメータを取得
    const params = this._activatedRoute.snapshot.queryParams;
    this.page = params.page ? parseInt(params.page) : 1;

    // 楽天でレビュー情報を取得(WEBスクレイピング)
    const url = `${productInfoFull['reviewUrlPC']}${this.page}`
    this._webScrapingService.scrapingReviewsFromRakuten(url)
    .subscribe(data => {
      this.reviews = data.reviews;
      this.pageTotal = Number(data.pageInfo.totalPage);
      this.pageTotalArr = new Array(this.pageTotal);
    }, null, null);

    // Twitterで関連ツイートを取得
    const name = productInfoFull['productNo'] || this.productInfo.name
    this._twitterApiService.getHashtagTweet(name)
    .subscribe(data => {
      // textに含まれるURLをaタグに変換
      const regexpUrl = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
      const regexpmMakeLink = function(all, url, h, href) {
          return '<a href="h' + href + '">' + url + '</a>';
      }
      const formattedData = data.map(d => {
        d.text = d.text.replace(regexpUrl, regexpmMakeLink)
        return d
      });
      // 表示用の配列に代入
      this.tweets = formattedData;
    }, null, null);

    // Youtubeで関連動画を取得
    this._youtubeApiService.getRelatedVideos(name)
    .subscribe(data => {
      // 表示用の配列に代入
      this.videos = data
    }, null, null);
  }
}
