import { Request, Response, Router } from "express";
import * as twit from 'twit';

// config
import * as twitterConfig from './config/twitter-client';

const router: Router = Router();

// Twitterで関連ハッシュタグのツイートを取得するAPI
router.get("/", async (req: Request, res: Response) => {
  // キーワードを分割
  const hashtagKeyword = req.query.hashtagKeyword;
  const hashtags = hashtagKeyword.split(/\s+/g);
  // 検索文字列を作成(OR条件で区切る)
  let q = `#${hashtagKeyword.replace(/\s+/g, "")}`;
  hashtags.forEach(hashtag => q += ` OR #${hashtag}`);
  q += ' -RT -filter:replies';

  // Twitterのclient
  const tClient = new twit({
    consumer_key: twitterConfig.consumerKey,
    consumer_secret: twitterConfig.consumerSecret,
    access_token: twitterConfig.accessToken,
    access_token_secret: twitterConfig.accessTokenSecret
  });

  // パラメータをセット
  const params = {
    q: q,
    lang: 'ja',
    count: 100
  }

  // TwitterAPIをたたく
  const result = await tClient.get('search/tweets', params)
  .then(async function(result) {
    return result.data.statuses.map(status => {
      return {
        text: status.text,
        media: status.extended_entities && status.extended_entities.media.length ? status.extended_entities.media.map(data => { return { dataUrl: data.media_url, type: data.type} }) : []
      }
    });
  });

  // jsonで返す
  res.json(result);
});

export default router;
