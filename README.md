# ReviewNavi

楽天のAPIを利用して、検索条件に一致する商品のレビュー一覧を表示する

## Feature
* 商品に対するレビューのみを表示(不要な付加情報なし)

## Install

```
$ npm install
```

## Usage
1. installする
2. 以下の情報を持った`lib/service/rakuten-api/config/secret-config.ts`を作成

  ```
  // 自分のappIDとaffiliateID
  export const appid: string = '01234567890123456789';
  export const affiliateId: string = '12345678.abcdefgh.12345678.abcdefgh'
  ```

3. 起動

  ```
  $ npm start
  ```
