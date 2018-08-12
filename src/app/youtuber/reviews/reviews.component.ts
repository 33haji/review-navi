import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RakutenApiService } from './../../../lib/service/rakuten-api/rakuten-api.service';
import { Title, DomSanitizer } from '@angular/platform-browser';
// それぞれのYoutuberのデータ
import * as hajimesyatyo from '../data/hajimesyatyo'
import * as hikakin from '../data/hikakin'
import * as watanabemahoto from '../data/watanabemahoto'
import * as orutanachannel from '../data/orutanachannel'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [RakutenApiService]
})
export class ReviewsComponent implements OnInit {
  id: string = ''; // 例：hajimesyatyo
  data: object; // 全てのYoutuberのデータ
  // 対象のYoutuberのデータ
  youtuberData: {
    id: string,
    name: string,
    reviews: object[]
  }

  constructor(
    private _titleService: Title,
    private _sanitaizerService: DomSanitizer,
    private _activatedRoute: ActivatedRoute,
    private _rakutenApiService: RakutenApiService,
  ) {
    const params = this._activatedRoute.snapshot.queryParams;
    this.id = params.name;
    // データをまとめる
    this.data = { hajimesyatyo, hikakin, watanabemahoto, orutanachannel };
  }

  async ngOnInit() {
    // 対象Youtuberのデータを取得
    this.youtuberData = this.data[this.id];
    // ページタイトルを設定
    this._titleService.setTitle(`${this.youtuberData.name} 商品レビュー まとめ - レビュコレ -`);
    // 商品の情報を取得
    const productIds = this.youtuberData.reviews.map(review => review['item'].id);
    this._rakutenApiService.findByProductIds(productIds)
    .subscribe(data => {
      data.forEach((item, index) => {
        const itemInfo = item.Product;
        this.youtuberData.reviews[index]['item'].minPrice = itemInfo.minPrice;
        this.youtuberData.reviews[index]['item'].maxPrice = itemInfo.maxPrice;
        this.youtuberData.reviews[index]['item'].affiliateUrl = itemInfo.affiliateUrl;
        this.youtuberData.reviews[index]['item'].genreName = itemInfo.genreName;
      });
    }, null, null);
  }

  videoUrl (url: string) {
    return this._sanitaizerService.bypassSecurityTrustResourceUrl(url)
  }
}
