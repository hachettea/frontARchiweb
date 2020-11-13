import { TestBed } from '@angular/core/testing';

import { NotifsInterceptor } from './notifs.interceptor';

describe('NotifsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotifsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NotifsInterceptor = TestBed.inject(NotifsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
