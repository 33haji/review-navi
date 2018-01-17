import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CustomValidators = require('./../../../lib/util/customValidators');
import { YahooShoppingApiService } from './../../../lib/service/yahoo-shopping-api/yahoo-shopping-api.service';

@Component({
  selector: 'top-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [YahooShoppingApiService]
})
export class IndexComponent {

  // 商品情報入力フォーム
  shoppingSearchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _yahooShoppingApiService: YahooShoppingApiService,
    private router: Router
  ) {
    this.shoppingSearchForm = fb.group({
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
    // 商品検索APIを使って、商品を検索する
    this._yahooShoppingApiService
      .itemSearch(value.keyword, value.priceFrom, value.priceTo, 50)
      .subscribe(data => {
        const itemList: object[] = data.ResultSet[0].Result;

        // localStrageに検索結果を保存
        localStorage.setItem('yahooItemSearchResults', JSON.stringify(itemList));

        // レビューページに遷移
        this.router.navigateByUrl('/reviews');
      });
  }

}
