import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RequestPath } from './config';
import { NGX_MOCK_CONFIG } from './config-token';

import { MockInterceptor } from './mock.interceptor';

describe('MockInterceptor Matcher Tests', () => {
  let interceptor: MockInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: NGX_MOCK_CONFIG, useValue: {} }, MockInterceptor],
    });
    interceptor = TestBed.inject(MockInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('Method Matching Tests', () => {
    const methodTests: TestRequest[] = [
      {
        request: new HttpRequest('GET', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('DELETE', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'DELETE',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('HEAD', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'HEAD',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('OPTIONS', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'OPTIONS',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('JSONP', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'JSONP',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('POST', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'POST',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('PUT', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'PUT',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('PATCH', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'PATCH',
          mockPath: '/test',
        },
      },
    ];
    methodTests.forEach((test) => {
      it(`should match method ${test.request.method}`, () => {
        expect(
          interceptor.matchesMethod(test.request, test.requestPath)
        ).toBeTrue();
      });
    });

    const methodMismatchTests: TestRequest[] = [
      {
        request: new HttpRequest('POST', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('DELETE', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('HEAD', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('OPTIONS', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('JSONP', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('POST', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('PUT', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('PATCH', 'http://localhost', null),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
    ];
    methodMismatchTests.forEach((test) => {
      it(`should not match method ${test.request.method}`, () => {
        expect(
          interceptor.matchesMethod(test.request, test.requestPath)
        ).toBeFalse();
      });
    });
  });

  describe('Path Matching Tests', () => {
    const pathTests: TestRequest[] = [
      {
        request: new HttpRequest('GET', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('GET', 'http://test.com?abc=123'),
        requestPath: {
          path: 'http://test.com?abc=123',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest(
          'GET',
          'http://Test.com?abc=123&abc=456&def=test'
        ),
        requestPath: {
          path: 'http://Test.com?abc=123&abc=456&def=test',
          method: 'GET',
          mockPath: '/test',
        },
      },
    ];
    pathTests.forEach((test) => {
      it(`should match paths ${test.request.url}`, () => {
        expect(
          interceptor.matchesPath(test.request, test.requestPath)
        ).toBeTrue();
      });
    });

    const pathMismatchTests: TestRequest[] = [
      {
        request: new HttpRequest('GET', 'http://localhost'),
        requestPath: {
          path: 'http://localhos',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('GET', 'http://test.com'),
        requestPath: {
          path: 'http://www.test.com',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('GET', 'http://test.com?abc=123'),
        requestPath: {
          path: 'http://test.com',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromString: 'abc=123' }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://test.com?abc=123'),
        requestPath: {
          path: 'http://test.com',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromObject: { abc: '123' } }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://test.com', {
          params: new HttpParams({ fromString: 'test=123' }),
        }),
        requestPath: {
          path: 'http://test.com?test=123',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromString: 'abc' }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://test.com', {
          params: new HttpParams({ fromObject: { test: '123' } }),
        }),
        requestPath: {
          path: 'http://test.com?test=123',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromObject: { test: '123' } }),
        },
      },
    ];
    pathMismatchTests.forEach((test) => {
      it(`should not match mismatched paths ${test.request.url}`, () => {
        expect(
          interceptor.matchesPath(test.request, test.requestPath)
        ).toBeFalse();
      });
    });
  });

  describe('Params Match Tests', () => {
    const paramsTest: TestRequest[] = [
      {
        request: new HttpRequest('GET', 'http://localhost'),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({ fromObject: { test0: '123' } }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromObject: { test0: '123' } }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({ fromString: 'test1=123' }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromString: 'test1=123' }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost?test1=abc', {
          params: new HttpParams({ fromString: 'test2=123' }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromString: 'test2=123' }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost?test1', {
          params: new HttpParams({ fromString: 'test3=123' }),
        }),
        requestPath: {
          path: 'http://localhost?test1=abc',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({ fromString: 'test3=123' }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromString: 'test4=123&test5=abc&test6=def',
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromObject: { test4: '123', test5: 'abc', test6: 'def' },
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromObject: { test7: '123', test8: 'abc', test9: 'def' },
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromString: 'test7=123&test8=abc&test9=def',
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromString: 'test10=123&test11=abc&test12=def',
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromString: 'test10=123&test12=def&test11=abc',
          }),
        },
      },
    ];
    paramsTest.forEach((test) => {
      it(`should match params ${test.request.params.toString()}`, () => {
        expect(
          interceptor.matchesParams(test.request, test.requestPath)
        ).toBeTrue();
      });
    });

    const paramsMismatchTest: TestRequest[] = [
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromString: 'test0=abc',
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromObject: { test1: 'abc' },
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {}),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromString: 'test3=abc',
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {}),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromObject: { test4: '123' },
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromObject: { test5: 'abc' },
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromObject: { test: 'abc' },
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromObject: { test6: 'abc' },
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromObject: { test6: 'abb' },
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost?test7=abc', {
          params: new HttpParams({
            fromObject: { test7: 'def' },
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromString: 'test7=abc&test7=def',
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromString: 'test7=abc',
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromString: 'test7=abc&test7=def',
          }),
        },
      },
      {
        request: new HttpRequest('GET', 'http://localhost', {
          params: new HttpParams({
            fromString: 'test7=abc&test7=def',
          }),
        }),
        requestPath: {
          path: 'http://localhost',
          method: 'GET',
          mockPath: '/test',
          httpParams: new HttpParams({
            fromString: 'test7=def',
          }),
        },
      },
    ];
    paramsMismatchTest.forEach((test) => {
      it(`should not match mistmatched params ${test.request.params.toString()}`, () => {
        expect(
          interceptor.matchesParams(test.request, test.requestPath)
        ).toBeFalse();
      });
    });
  });
});

export interface TestRequest {
  request: HttpRequest<unknown>;
  requestPath: RequestPath;
}
