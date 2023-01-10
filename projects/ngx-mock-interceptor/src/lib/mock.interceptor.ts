import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockConfig, NGX_MOCK_CONFIG, RequestPath } from './config';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor(@Inject(NGX_MOCK_CONFIG) private config: MockConfig) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      !this.config ||
      this.config.disableMocking ||
      this.findMethodPathAndParams(request) !== undefined
    ) {
      return next.handle(request);
    }
    const requestPath = this.findMethodPathAndParams(request);
    request = request.clone({
      url: requestPath?.mockPath,
      params: new HttpParams(),
      method: 'GET',
    });
    return next.handle(request);
  }

  findMethodPathAndParams(
    request: HttpRequest<unknown>
  ): RequestPath | undefined {
    return this.config.requestPaths?.find(
      (requestPath) =>
        this.matchesMethod(request, requestPath) &&
        this.matchesPath(request, requestPath) &&
        this.matchesParams(request, requestPath)
    );
  }

  matchesMethod(
    request: HttpRequest<unknown>,
    requestPath: RequestPath
  ): boolean {
    return request.method.toLowerCase() === requestPath.method.toLowerCase();
  }

  matchesPath(
    request: HttpRequest<unknown>,
    requestPath: RequestPath
  ): boolean {
    return request.url === requestPath.path;
  }

  matchesParams(
    request: HttpRequest<unknown>,
    requestPath: RequestPath
  ): boolean {
    return (
      !requestPath.httpParams ||
      !!requestPath.httpParams
        ?.keys()
        .every((pathParamKey) =>
          requestPath.httpParams
            ?.getAll(pathParamKey)
            ?.every((pathParam) =>
              request.params
                .getAll(pathParamKey)
                ?.some((param) => param === pathParam)
            )
        )
    );
  }
}
