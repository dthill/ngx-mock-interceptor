import { HttpParams } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

export const NGX_MOCK_CONFIG = new InjectionToken<MockConfig>(
  'ngx-mock-config'
);

export interface RequestPath {
  path: string;
  mockPath: string;
  httpParams?: HttpParams;
  method:
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'JSONP'
    | 'OPTIONS'
    | 'POST'
    | 'PUT'
    | 'PATCH';
}

export interface MockConfig {
  requestPaths?: RequestPath[];
  disableMocking?: boolean;
}
