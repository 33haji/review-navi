# ReviewNavi

自分が関心のあるアイテムに関する評価や情報をまとめたサイト

## Feature
* 見ることのできる評価や情報は以下
  - 楽天のレビュー
  - Twitterの関連ツイート
  - YouTubeの関連動画
  - 関連アイテムのランキング

## Install

```
$ npm install
```

## Usage
1. Nodeのパッケージをinstall
2. 秘密鍵などの情報を持ったファイルを作成

  ```
  # /server/routes/api/config/rakuten-client.ts
  // 楽天のappIDとaffiliateID
  export const appid: string = [個人のappid];
  export const affiliateId: string = [個人のaffiliateId];

  # /server/routes/api/config/twitter-client.ts
  // Twitterのクライアント情報
  export const consumerKey: string = [個人のconsumerKey];
  export const consumerSecret: string = [個人のconsumerSecret];
  export const accessToken: string = [個人のaccessToken];
  export const accessTokenSecret: string = [個人のaccessTokenSecret];

  # /server/routes/api/config/youtube-client.ts
  // YouTubeのクライアント情報
  export const apiKey: string = [個人のapiキー];
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
