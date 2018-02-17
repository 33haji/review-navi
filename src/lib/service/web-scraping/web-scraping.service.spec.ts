import { TestBed, inject } from '@angular/core/testing';

import { WebScrapingService } from './web-scraping.service';

describe('WebScrapingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebScrapingService]
    });
  });

  it('should be created', inject([WebScrapingService], (service: WebScrapingService) => {
    expect(service).toBeTruthy();
  }));
});
