import { TestBed } from '@angular/core/testing';

import { MockInterceptor } from './mock.interceptor';

describe('MockInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockInterceptor = TestBed.inject(MockInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
