import { TestBed, inject } from '@angular/core/testing';

import { YahooShoppingApiService } from './yahoo-shopping-api.service';

describe('YahooShoppingApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YahooShoppingApiService]
    });
  });

  it('should be created', inject([YahooShoppingApiService], (service: YahooShoppingApiService) => {
    expect(service).toBeTruthy();
  }));
});
