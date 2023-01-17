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
          method: 'GET',
          mockPath: ' /assets/get-test.json',
        },
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'POST',
          mockPath: ' /assets/post-test.json',
          httpParams: new HttpParams({
            fromString: 'param1=123',
          }),
        },
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'PUT',
          mockPath: ' /assets/put-test.json',
        },
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'PATCH',
          mockPath: ' /assets/patch-test.json',
          httpParams: new HttpParams({
            fromString: 'param1=123&param2=abc&param1=456',
          }),
        },
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'DELETE',
          mockPath: ' /assets/delete-test.json',
        },
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'HEAD',
          mockPath: ' /assets/head-test.json',
        },
        {
          path: 'https://jsonplaceholder.typicode.com/posts/1',
          method: 'OPTIONS',
          mockPath: ' /assets/options-test.json',
        },
      ],
      enableMocking: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
