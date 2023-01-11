import { HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockConfig } from './config';
import { NGX_MOCK_CONFIG } from './config-token';

import { MockInterceptor } from './mock.interceptor';

describe('MockInterceptor Intercepter Tests', () => {
  let interceptor: MockInterceptor;
  let mockConfig: MockConfig = {
    requestPaths: [
      {
        path: 'http://test.com',
        mockPath: '/assets/test.json',
        method: 'GET',
      },
      {
        path: 'http://test1.com',
        mockPath: '/assets/test.json',
        method: 'GET',
        httpParams: new HttpParams({
          fromString: 'test1=123&test1=abc&test2=def',
        }),
      },
      {
        path: 'http://test2.com',
        mockPath: '/assets/test.json',
        method: 'POST',
        httpParams: new HttpParams({
          fromString: 'test1=123&test1=abc&test2=def',
        }),
      },
    ],
    enableMocking: true,
  };
  let mockHttpHandler: HttpHandler;

  const matchingTests: HttpRequest<unknown>[] = [
    new HttpRequest('GET', 'http://test.com'),
    new HttpRequest('GET', 'http://test1.com', {
      params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
    }),
    new HttpRequest('POST', 'http://test2.com', null, {
      params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
    }),
  ];

  const mismatchingTests: HttpRequest<unknown>[] = [
    new HttpRequest('POST', 'http://test.com', null),
    new HttpRequest('POST', 'http://test1.com', null, {
      params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
    }),
    new HttpRequest('GET', 'http://test2.com', null, {
      params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=def' }),
    }),
    new HttpRequest('GET', 'http://test.com', {
      params: new HttpParams({ fromString: 'test1=123' }),
    }),
    new HttpRequest('GET', 'http://test1.com', {
      params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=d' }),
    }),
    new HttpRequest('POST', 'http://test2.com', null, {
      params: new HttpParams({ fromString: 'test1=123&test1=abc&test2=d' }),
    }),
    new HttpRequest('GET', 'http://test1.com'),
    new HttpRequest('POST', 'http://test2.com', null),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NGX_MOCK_CONFIG, useValue: mockConfig },
        MockInterceptor,
      ],
    });
    interceptor = TestBed.inject(MockInterceptor);
    mockConfig.enableMocking = true;
    mockHttpHandler = {
      handle: (req: HttpRequest<unknown>) => req as any,
    };
  });

  describe('Matching Path Finder Tests', () => {
    matchingTests.forEach((request) => {
      it(`finds a matching path for request ${request.url}`, () => {
        const result = interceptor.findMethodPathAndParams(request);
        expect(result).toBeDefined();
        expect(result?.mockPath).toBe('/assets/test.json');
      });
    });

    mismatchingTests.forEach((request) => {
      it(`should not find a matching path for a mismatching request ${request.url}`, () => {
        const result = interceptor.findMethodPathAndParams(request);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Intercept Tests', () => {
    matchingTests.forEach((request) => {
      it('intercepts matching requests', () => {
        const result: HttpRequest<unknown> = interceptor.intercept(
          request,
          mockHttpHandler
        ) as any;
        expect(result.url).toBe('/assets/test.json');
        expect(result.params.keys().length).toBe(0);
        expect(result.method).toBe('GET');
      });
    });
    mismatchingTests.forEach((request) => {
      it('does not intercept mismatching requests', () => {
        const result: HttpRequest<unknown> = interceptor.intercept(
          request,
          mockHttpHandler
        ) as any;
        expect(result.url).toBe(request.url);
        expect(result.params.keys().length).toBe(request.params.keys().length);
        expect(result.method).toBe(request.method);
      });
    });

    [...matchingTests, ...mismatchingTests].forEach((request) => {
      it('does not intercept requests if not enabled', () => {
        mockConfig.enableMocking = false;
        const result: HttpRequest<unknown> = interceptor.intercept(
          request,
          mockHttpHandler
        ) as any;
        expect(result.url).toBe(request.url);
        expect(result.params.keys().length).toBe(request.params.keys().length);
        expect(result.method).toBe(request.method);
      });
    });
  });
});
