import { Request, Response, Router } from "express";
import * as request from 'request';
import { get } from 'lodash';

// config
import { appid, affiliateId } from './config/rakuten-client';

const router: Router = Router();

// 楽天で検索条件に合ったアイテム情報を返すAPI
router.get("/", async (req: Request, res: Response) => {
  // 検索条件を取得
  const keyword = req.query.keyword;
  const genreIds = req.query.genreIds.split(',');
  // パラメータを設定
  const params = {
    applicationId: appid,
    affiliateId: affiliateId,
    keyword: keyword || '',
    genreId: ''
  }
  const version = '20170426';
  const url = `https://app.rakuten.co.jp/services/api/Product/Search/${version}`;

  // カテゴリーの要素数分だけループさせる
  let prouducts: object[] = [];
  for (let genreId of genreIds) {
    params.genreId = genreId

    // APIをたたく
    const resultProducts = await new Promise(resolve => {
      let results: object[] = [];
      request.get({ url, qs: params, json: true }, (e, response, body) => {
        if (e) {
          res.status(500).send({ error: e.message });
        }
        resolve(body.Products);
      });
    });
    prouducts = prouducts.concat(resultProducts);
  }

  // jsonで返す
  res.json(prouducts);
});

// id(productIdやgenreIdなど)でアイテム情報を検索するAPI
router.get("/id", async (req: Request, res: Response) => {
  // 検索条件を取得
  const { productId = '', genreId = '', sort = 'standard' } = req.query;
  // パラメータを設定
  const params = {
    applicationId: appid,
    affiliateId,
    productId,
    genreId,
    sort
  }
  const version = '20170426';
  const url = `https://app.rakuten.co.jp/services/api/Product/Search/${version}`;

  // APIをたたく
  const resultProducts = await new Promise(resolve => {
    let results: object[] = [];
    request.get({ url, qs: params, json: true }, (e, response, body) => {
      if (e) {
        res.status(500).send({ error: e.message });
      }
      resolve(body.Products);
    });
  });

  // jsonで返す
  res.json(resultProducts);
});

// productIdsでアイテム情報を検索するAPI
router.get("/productIds", async (req: Request, res: Response) => {
  // 検索条件を取得
  const { productIds = '' } = req.query;
  const productIdsArray = productIds.split(',');
  // パラメータを設定
  const params = {
    applicationId: appid,
    productId: '',
    affiliateId
  }
  const version = '20170426';
  const url = `https://app.rakuten.co.jp/services/api/Product/Search/${version}`;

  // カテゴリーの要素数分だけループさせる
  let prouducts: object[] = [];
  for (let productId of productIdsArray) {
    params.productId = productId

    // APIをたたく
    const resultProducts = await new Promise(resolve => {
      // request.get({ url, qs: params, json: true }, (e, response, body) => {
      //   if (e) {
      //     res.status(500).send({ error: e.message });
      //   }
      //   resolve(body.Products);
      // });
      setTimeout(() => {
        request.get({ url, qs: params, json: true }, (e, response, body) => {
          if (e) {
            res.status(500).send({ error: e.message });
          }
          resolve(body.Products);
        });
      }, 300);
    });
    prouducts = prouducts.concat(resultProducts);
  };
  // jsonで返す
  res.json(prouducts);
});

// 対象ジャンルのランキングを取得するAPI
router.get("/ranking", async (req: Request, res: Response) => {
  // 検索条件を取得
  const genreId = get(req, 'query.genreId', 0);
  // パラメータを設定
  const params = {
    applicationId: appid,
    affiliateId: affiliateId,
    genreId: genreId || 0
  }
  const version = '20170628';
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/${version}`;

  // APIをたたく
  const resultProducts = await new Promise(resolve => {
    let results: object[] = [];
    request.get({ url, qs: params, json: true }, (e, response, body) => {
      if (e) {
        res.status(500).send({ error: e.message });
      }
      resolve(body);
    });
  });

  // jsonで返す
  res.json(resultProducts);
});

export default router;
