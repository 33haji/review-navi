import { TestBed, inject } from '@angular/core/testing';

import { RakutenApiService } from './rakuten-api.service';

describe('RakutenApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RakutenApiService]
    });
  });

  it('should be created', inject([RakutenApiService], (service: RakutenApiService) => {
    expect(service).toBeTruthy();
  }));
});
