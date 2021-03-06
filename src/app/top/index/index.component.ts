import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CustomValidators from './../../../lib/util/customValidators';
import { RakutenApiService } from './../../../lib/service/rakuten-api/rakuten-api.service';
import { youtuber } from '../../youtuber/data/youtuber';

@Component({
  selector: 'top-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [RakutenApiService]
})
export class IndexComponent {
  // カテゴリー(楽天ジャンル)
  categories: object[] = [
    { label: 'ファッション', value: ['551177', '100371', '558885', '216131', '216129', '558929', '100433', '100533'] },
    { label: 'エンタメ・デジタル家電', value: ['10026', '211742', '564500', '566382', '101240', '562637', '101164'] },
    { label: 'グルメ', value: ['100227', '100316', '510915', '551167', '100317', '510901'] },
    { label: '住まい・暮らし', value: ['100804', '215783', '100005', '101213', '558944'] },
    { label: '美容・健康', value: ['100938', '100939', '551169'] },
    { label: '車・スポーツ', value: ['101070', '101114', '101077', '503190'] }
  ]
  // アイテム情報入力フォーム
  searchForm: FormGroup;
  // アイテム検索結果
  searchProducts: object[] = [];
  // PC or SP
  isSp: boolean;
  // ランキング
  ranking: object[] = [];
  // Youtuber
  youtuber: object[];

  constructor(
    private fb: FormBuilder,
    private _rakutenApiService: RakutenApiService,
    private router: Router
  ) {
    this.searchForm = fb.group({
      // アイテム名
      'keyword': ['', Validators.required],
      // カテゴリー
      'category': [null, null]
    });
    // userAgentの判定
    const userAgent = window.navigator.userAgent;
    this.isSp = userAgent.indexOf('iPhone') > 0
                || (userAgent.indexOf('Android') > 0) && (userAgent.indexOf('Mobile') > 0)
                || userAgent.indexOf('Windows Phone') > 0;
    // youtuber
    this.youtuber = youtuber.slice(0, 5);
  }

  async ngOnInit() {
    // ランキングを取得
    // 家電
    this._rakutenApiService.findByGenreId('562637', '-seller')
    .subscribe(data => {
      const obj = { genre: '家電', icon: 'tv', items: data }
      this.ranking.push(obj);
    }, null, null);
    // CD・DVD・楽器
    this._rakutenApiService.findByGenreId('101240', '-seller')
    .subscribe(data => {
      const obj = { genre: 'CD・DVD・楽器', icon: 'film', items: data }
      this.ranking.push(obj);
    }, null, null);
    // 本・雑誌・コミック
    this._rakutenApiService.findByGenreId('200162', '-seller')
    .subscribe(data => {
      const obj = { genre: '本・雑誌・コミック', icon: 'book', items: data }
      this.ranking.push(obj);
    }, null, null);
  }

  // "アイテム検索"ボタンを押した時の処理
  onSubmit(value: any) {
    // History API
    history.pushState(null, null, `/?keyword=${value.keyword}&category=${value.category}`);
    // 選択したカテゴリーに含まれるジャンルIDを取得
    const targetCategory = this.categories.find(category => category['label'] === value.category);
    const genreIds = targetCategory ? targetCategory['value'] : ['']
    // 楽天の商品価格ナビ製品検索APIを使って、商品を検索する
    let itemList: object[] = []
    this._rakutenApiService.productSearch(value.keyword, genreIds)
    .subscribe(data => {
      // 表示用の配列に代入
      this.searchProducts = data
    }, null, null);
  }

}
