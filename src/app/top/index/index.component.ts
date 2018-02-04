import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CustomValidators from './../../../lib/util/customValidators';
import { RakutenApiService } from './../../../lib/service/rakuten-api/rakuten-api.service';

@Component({
  selector: 'top-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [RakutenApiService]
})
export class IndexComponent {

  // 商品情報入力フォーム
  searchForm: FormGroup;
  // 商品検索結果
  searchProducts: object[] = [];

  constructor(
    private fb: FormBuilder,
    private _rakutenApiService: RakutenApiService,
    private router: Router
  ) {
    this.searchForm = fb.group({
      // 商品名
      'keyword': ['', Validators.required],
      // 最低価格
      'priceFrom': [null, CustomValidators.numberValidator],
      // 最高価格
      'priceTo': [null, CustomValidators.numberValidator]
      // TODO 商品カテゴリーで絞りこめるようにする
    });
  }

  // "レビュー表示"ボタンを押した時の処理
  onSubmit(value: any): void {
    // 楽天の商品価格ナビ製品検索APIを使って、商品を検索する
    let itemList: object[] = []
    this._rakutenApiService
      .productSearch(value.keyword, value.priceFrom, value.priceTo)
      .subscribe(data => {
        // 検索結果を配列に格納することで画面に出力
        this.searchProducts = data.Products;
      }, null, null);
  }

  // 商品をクリックした時の処理
  onClickProduct(event: any, index: number) {
    // localStrageに対象の商品情報を保管
    localStorage.setItem('productInfo', JSON.stringify(this.searchProducts[index]['Product']));
  }

}
