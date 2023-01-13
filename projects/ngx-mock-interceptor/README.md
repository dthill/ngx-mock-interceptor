# ngx-mock-interceptor

This library is intended for facilitating mocking http request using the Angular `HttpClient` and was born out of the repeated creation of similar interceptors in projects where the frontend development was ahead of the backend development. After agreeing a basic API for a backend request the frontend developers can mock the missing requests by simply using json files.

The main intent for this library was to facilitate the quick development of features in the frontend without having to wait for the backend to be completed.

## Installation and Setup

To install run:

```Shell
npm install ngx-mock-interceptor
```

After installing `NgxMockInterceptorModule` should be imported into app.module and a config provided to its `forRoot` function.

For the library to work correctly Angular's `HttpClientModule` needs to be imported before `NgxMockInterceptorModule`.

```TypeScript
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMockInterceptorModule } from 'ngx-mock-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMockInterceptorModule.forRoot({
      requestPaths: [
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'POST',
          mockPath: ' /assets/test.json',
          httpParams: new HttpParams({
            fromString: 'param1=123',
          }),
        },
      ],
      enableMocking: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

For the mock interceptor to work the `enableMocking` property in the provided config needs to be set to `true`. This is to avoid accidental mocking being enable in production environments.

Now you can use the Angular `HttpClient` as you normally would and it will load the data from the mocked path.

```TypeScript
this.httpClient
      .post(
        'https://jsonplaceholder.typicode.com/posts/1',
        { body: 'real data ment to be sent to the backend' },
        {
          params: new HttpParams({ fromString: 'param1=123' }),
        }
      )
      .subscribe((response) => {
        // ... do something with the response data from test.json
      });
```

test.json

```json
{
  "responseData": "response data example"
}
```

## Configuration

The configuration has the following API:

```TypeScript

export interface MockConfig {
    // this provides a list of all the requests that should be mocked
    requestPaths?: RequestPath[];
    // this needs to be set to true for the mocking to be enabled
     enableMocking?: boolean;
}


export interface RequestPath {
    // corresponds to the HttpRequest.url
    path: string;
    // the new path to a json file for example
    mockPath: string;
    // parameters included in the original request
    httpParams?: HttpParams;
    // method of the original request
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
```

The request paths provided in the configuration need to exactly match the HttpRequest used by the Angular HttpClient. This means that the url/path, method and HttpParams for both need to be the same as otherwise the request will not be mocked.

## Example/Demo

A minimal example can be found under the `projects/demo` folder which shows a very basic usage of the library in a

## Bugs and Suggestions

If you found a bug or have a suggestion for improvements please open an issue in this GitHub repo.
