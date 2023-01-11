import { HttpParams } from '@angular/common/http';

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
