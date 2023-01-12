import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockConfig, RequestPath } from './config';
import { NGX_MOCK_CONFIG } from './config-token';

import { MockInterceptor } from './mock.interceptor';

describe('MockInterceptor Intercepter Tests', () => {
  let interceptor: MockInterceptor;
  let mockConfig: MockConfig = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NGX_MOCK_CONFIG, useValue: mockConfig },
        MockInterceptor,
      ],
    });
    interceptor = TestBed.inject(MockInterceptor);
  });

  describe('Matching Path Finder Tests', () => {
    mockConfig = {
      requestPaths: [
        {
          path: 'http://test.com',
          mockPath: '/assets/test.json',
          method: 'GET',
          httpParams: new HttpParams({
            fromString: 'test1=123&test1=abc&test2=def',
          }),
        },
        {
          path: 'http://test1.com',
          mockPath: '/assets/test.json',
          method: 'POST',
          httpParams: new HttpParams({
            fromString: 'test1=123&test1=abc&test2=def',
          }),
        },
      ],
    };

    const findResquestTests: HttpRequest<unknown>[] = [
      new HttpRequest('GET', 'http://test.com', {
        params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
      }),
      new HttpRequest('POST', 'http://test1.com', null, {
        params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
      }),
    ];
    findResquestTests.forEach((request) => {
      it(`finds a matching path for request ${request.url}`, () => {
        const result = interceptor.findMethodPathAndParams(request);
        expect(result).toBeDefined();
        expect(result?.mockPath).toBe('/assets/test.json');
      });
    });

    const ignoreMismatchResquestTests: HttpRequest<unknown>[] = [
      new HttpRequest('POST', 'http://test.com', {
        params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
      }),
      new HttpRequest('GET', 'http://test1.com', null, {
        params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
      }),
      new HttpRequest('GET', 'http://test.com', {
        params: new HttpParams({ fromString: 'test1=123' }),
      }),
      new HttpRequest('POST', 'http://test.com', null, {
        params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
      }),
      new HttpRequest('GET', 'http://test.com'),
      new HttpRequest('POST', 'http://test1.com', null),
    ];
    ignoreMismatchResquestTests.forEach((request) => {
      it(`should not find a matching path for a mismatching request ${request.url}`, () => {
        const result = interceptor.findMethodPathAndParams(request);
        expect(result).toBeUndefined();
      });
    });
  });
});

export interface TestRequest {
  request: HttpRequest<unknown>;
  requestPath: RequestPath;
}
