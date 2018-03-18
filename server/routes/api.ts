import { Request, Response, Router } from "express";
import * as cheerio from 'cheerio';
import * as request from 'request'
// import * as puppeteer from 'puppeteer';

const apiRouter: Router = Router();

// 対象のURLのレビュー情報をスクレイピングし、その情報を返すAPI
apiRouter.get("/scraping", async (req: Request, res: Response) => {
  const url = req.query.url;

  // 対象のURLを読み込む
  request(url, (e, response, body) => {
    if (e) {
      res.status(500).send({ error: e.message });
    }

    try {
      // ページから情報を取得
      const $ = cheerio.load(body);
      let results: { reviews: object[], pageInfo: object } = {
        reviews: [],
        pageInfo: {}
      };

      // レビュー情報
      results.reviews = $('.rpsRevListLeft').map(function() {
        return {
          title: $(this).find('.revTitle').text() ? $(this).find('.revTitle').text() : '',
          review: $(this).find('.revTxt').text() ? $(this).find('.revTxt').text() : '',
          point: $(this).find('.txtPoint').text() ? $(this).find('.txtPoint').text() : 0,
          date: $(this).find('.revDays').text() ? $(this).find('.revDays').text() : 0
        }
      }).get();
      
      // ページ情報
      results.pageInfo = {
        totalPage: $('.dui-pagination>a.item').not('.-previous').not('.-next').not('.-first').length
      }

      res.json(results)
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  })

  /*
   * 以下はpuppeteerを使ってヘッドレスブラウザでWEBスクレイピングを行う方法
   * 現在はcheerioを使用しているので使っていないが、一応残す
   */
  // try {
  //
  //   // 対象URLのページに接続
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   await page.goto(url);
  //   // ページから情報を取得
  //   const reviews = await page.evaluate(() => {
  //     const reviewNodeList = document.querySelectorAll('.rpsRevListLeft');
  //     let results: { reviews: object[], pageInfo: object } = {
  //       reviews: [],
  //       pageInfo: {}
  //     };
  //     // レビュー情報
  //     results.reviews = Array.from(reviewNodeList, data => {
  //       return {
  //         title: data.querySelector('.revTitle') ? data.querySelector('.revTitle').textContent : '',
  //         review: data.querySelector('.revTxt') ? data.querySelector('.revTxt').textContent : '',
  //         point: data.querySelector('.txtPoint') ? data.querySelector('.txtPoint').textContent : 0,
  //         date: data.querySelector('.revDays') ? data.querySelector('.revDays').textContent : 0
  //       }
  //     })
  //
  //     // ページ情報
  //     results.pageInfo = {
  //       totalPage: document.querySelectorAll('.dui-pagination a.item:not(.-previous):not(.-next):not(.-first)').length
  //     }
  //
  //     return results;
  //   });
  //   browser.close()
  //
  //   res.json(reviews)
  // } catch(e) {
  //   // res.status(500).send({ error: '/api/scraping failed!' });
  //   res.status(500).send({ error: e.message });
  // }
});

export { apiRouter };
