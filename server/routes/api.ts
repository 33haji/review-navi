import { Request, Response, Router } from "express";
import * as puppeteer from 'puppeteer';

const apiRouter: Router = Router();

// 対象のURLのレビュー情報をスクレイピングし、その情報を返すAPI
apiRouter.get("/scraping", async (request: Request, response: Response) => {
  const url = request.query.url;

  try {
    // 対象URLのページに接続
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url);
    // ページから情報を取得
    const reviews = await page.evaluate(() => {
      const reviewNodeList = document.querySelectorAll('.rpsRevListLeft');
      // let results: { reviews: object[], pageInfo: object };
      // レビュー情報
      return Array.from(reviewNodeList, data => {
        return {
          title: data.querySelector('.revTitle') ? data.querySelector('.revTitle').textContent : '',
          review: data.querySelector('.revTxt') ? data.querySelector('.revTxt').textContent : '',
          point: data.querySelector('.txtPoint') ? data.querySelector('.txtPoint').textContent : 0,
          date: data.querySelector('.revDays') ? data.querySelector('.revDays').textContent : 0
        }
      })

      // ページ情報
      // console.dir(document.querySelectorAll('.dui-pagination'));
      // results.pageInfo = {
      //   totalPage:
      // }

      // return results;
    });
    browser.close()

    response.json(reviews)
  } catch(e) {
    response.status(500).send({ error: '/api/scraping failed!' });
  }
});

export { apiRouter };
