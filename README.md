# ReviewNavi

ある商品に関する評価や情報をまとめたサイト

## Feature
* 見ることのできる評価や情報は以下
  - 楽天のレビュー
  - Twitterの関連ツイート

## Install

```
$ npm install
```

## Usage
1. Nodeのパッケージをinstall
2. 秘密鍵などの情報を持ったファイルを作成

  ```
  # /src/lib/service/rakuten-api/config/secret-config.ts
  // 楽天のappIDとaffiliateID(以下の値はサンプル)
  export const appid: string = [個人のappid];
  export const affiliateId: string = [個人のaffiliateId];

  # /server/config/twitter-client.ts
  // Twitterのクライアント情報
  export const consumerKey: string = [個人のconsumerKey];
  export const consumerSecret: string = [個人のconsumerSecret];
  export const accessToken: string = [個人のaccessToken];
  export const accessTokenSecret: string = [個人のaccessTokenSecret];
  ```

3. 起動

  ```
  $ npm start
  ```

## Debug
#### 本番環境での動作確認
1. ビルドする

  ```
  $ npm run build
  ```

2. expressを利用してサービスを起動

  ```
  $ node dist/server/bin/www.js
  ```
