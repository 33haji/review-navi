import { Request, Response, Router } from "express";
import { findIndex } from 'lodash';
import * as YouTube from 'youtube-node';

// config
import * as youtubeConfig from './config/youtube-client';

const router: Router = Router();

// YouTubeで関連動画を検索するAPI
router.get("/", async (req: Request, res: Response) => {
  // キーワードを分割
  const queryKeyword = req.query.keyword;
  const keywords = queryKeyword.split(/\s+/g);
  keywords.unshift(queryKeyword);
  // APIクライアントを生成
  const youTube = new YouTube();
  youTube.setKey(youtubeConfig.apiKey);
  youTube.addParam('type', 'video');
  youTube.addParam('regionCode', 'JP');

  // search APIを使ってキーワード検索
  let response = [];  // 結果
  let videoIdsStr = ''; // ビデオのIDをカンマ区切りで連結した文字列
  const resultsPerKeyword = Math.floor(50 / keywords.length); // キーワードごとの検索数(全体で50に調整するため)
  let promiseArray = keywords.map(keyword => {
    return new Promise ((resolve, reject) => {
      youTube.search(keyword, resultsPerKeyword, function(error, result) {
        if (error) {
          console.log(error);
          reject(error);
        }

        // 検索結果を成形
        response = response.concat(result.items.map(data => {
          return {
            videoId: data.id.videoId,
            channelTitle: data.snippet.channelTitle,
            title: data.snippet.title,
            description: data.snippet.description,
            thumbnail: data.snippet.thumbnails.high.url
          }
        }));

        // ビデオのIDをカンマ区切りで連結
        result.items.forEach(data => videoIdsStr += `${videoIdsStr ? ',' : ''}${data.id.videoId}`);

        resolve(true);
      });
    });
  });
  await Promise.all(promiseArray);

  // ビデオの詳細情報を取得
  await new Promise ((resolve, reject) => {
    youTube.getById(videoIdsStr, function (error, result) {
      if (error) {
        console.log(error);
        reject(error);
      }

      // responseにデータを格納
      result.items.forEach(data => {
        const index = findIndex(response, (item => item.videoId === data.id));
        response[index].viewCount = data.statistics.viewCount;
        response[index].likeCount = data.statistics.likeCount;
        response[index].dislikeCount = data.statistics.dislikeCount;
      });

      resolve(true);
    });
  });

  // jsonで返す
  res.json(response);
});

export default router;
