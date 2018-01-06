import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators = require('./../../../lib/util/customValidators');

@Component({
  selector: 'top-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  // 商品情報入力フォーム
  shoppingSearchForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.shoppingSearchForm = fb.group({
      // 商品名
      'keyword': ['', Validators.required],
      // 最低価格
      'priceFrom': [0, CustomValidators.numberValidator],
      // 最高価格
      'priceTo': [null, CustomValidators.numberValidator]
      // TODO 商品カテゴリーで絞りこめるようにする
    });
  }

  // "検索"ボタンを押した時の処理
  onSubmit(value: string): void {
    console.log('送信された値：', value);
  }

}
