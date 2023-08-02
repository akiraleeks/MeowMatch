import { TestBed } from '@angular/core/testing';

import { RxjsSubscriptionService } from './rxjs-subscription.service';

describe('RxjsSubscriptionService', () => {
  let service: RxjsSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
