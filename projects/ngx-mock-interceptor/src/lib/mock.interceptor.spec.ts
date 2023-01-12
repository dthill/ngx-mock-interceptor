import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RequestPath } from './config';
import { NGX_MOCK_CONFIG } from './config-token';

import { MockInterceptor } from './mock.interceptor';

describe('MockInterceptor', () => {
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

export interface TestRequest {
  request: HttpRequest<unknown>;
  requestPath: RequestPath;
}
