import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NGX_MOCK_CONFIG } from './config-token';

import { MockInterceptor } from './mock.interceptor';

describe('MockInterceptor', () => {
  let httpClient: HttpClient;
  let interceptor: MockInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NGX_MOCK_CONFIG, useValue: {} },
        MockInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', (done) => {
    const interceptor: MockInterceptor = TestBed.inject(MockInterceptor);
    expect(interceptor).toBeTruthy();
    httpClient.get('/test').subscribe((result) => {
      console.log(result), done();
    });
  });
});
