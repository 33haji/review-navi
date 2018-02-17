/*
 *  WEBスクレイピング
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
// import * as cheerio from 'cheerio';
// import * as request from 'request';
// import * as puppeteer from 'puppeteer';

@Injectable()
export class WebScrapingService {

  constructor(
    private http: Http
  ) { }

  scrapingReviewsInfo (url: string) {
    // request(url, (err, response, body) => {
    //   if (err) return new Error('scrapingReviewsInfo().request failed');
    //
    //   try {
    //     // レビューのタイトルと内容を取得
    //     const $ = cheerio.load(body);
    //     const titles = $('.revTitle font b').text;
    //     console.dir(titles);
    //   } catch (err) {
    //     return new Error('scrapingReviewsInfo().cheerio failed');
    //   }
    // })
    const params = new URLSearchParams();
    params.set("url", url);
    this.http.get("api/scraping", { params })
    .map(res => res.json())
    .subscribe(data => {
      console.dir(data)
    }, null, () => console.log('done'));
  }
}
