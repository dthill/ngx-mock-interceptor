import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockConfig, RequestPath } from './config';
import { NGX_MOCK_CONFIG } from './config-token';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor(@Inject(NGX_MOCK_CONFIG) private config: MockConfig) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const matchingPath: false | undefined | RequestPath =
      this.config &&
      !this.config.disableMocking &&
      this.findMethodPathAndParams(request);
    if (!!matchingPath) {
      request = request.clone({
        url: matchingPath.mockPath,
        params: new HttpParams(),
        method: 'GET',
      });
    }
    return next.handle(request);
  }

  findMethodPathAndParams(
    request: HttpRequest<unknown>
  ): RequestPath | undefined {
    return this.config.requestPaths?.find((requestPath) => {
      return (
        this.matchesMethod(request, requestPath) &&
        this.matchesPath(request, requestPath) &&
        this.matchesParams(request, requestPath)
      );
    });
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
    return request.url.toLowerCase() === requestPath.path.toLowerCase();
  }

  matchesParams(
    request: HttpRequest<unknown>,
    requestPath: RequestPath
  ): boolean {
    return (
      (!requestPath.httpParams && !request.params.keys().length) ||
      (!!requestPath.httpParams
        ?.keys()
        .every((pathParamKey) =>
          requestPath.httpParams
            ?.getAll(pathParamKey)
            ?.every((pathParam) =>
              request.params
                .getAll(pathParamKey)
                ?.some((param) => param === pathParam)
            )
        ) &&
        request.params
          ?.keys()
          .every((paramKey) =>
            request.params
              .getAll(paramKey)
              ?.every((param) =>
                requestPath.httpParams
                  ?.getAll(paramKey)
                  ?.some((pathParam) => pathParam === param)
              )
          ))
    );
  }
}
