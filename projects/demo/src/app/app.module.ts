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
