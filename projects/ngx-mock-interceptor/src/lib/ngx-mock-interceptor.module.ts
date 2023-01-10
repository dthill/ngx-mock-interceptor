import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  Injector,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { MockConfig, NGX_MOCK_CONFIG } from './config';
import { MockInterceptor } from './mock.interceptor';

@NgModule({
  imports: [CommonModule],
})
export class NgxMockInterceptorModule {
  constructor(
    private injector: Injector,
    @Optional() @SkipSelf() parentModule?: NgxMockInterceptorModule
  ) {
    if (parentModule) {
      throw new Error(
        'NgxMockInterceptorModule is already loaded. Import it in the AppModule only'
      );
    }
    try {
      injector.get(HttpClient);
    } catch (error) {
      throw new Error(
        'HttpClient is not loaded. Import HttpClientModule in the AppModule before NgxMockInterceptorModule is loaded.'
      );
    }
  }

  static forRoot(
    config?: MockConfig
  ): ModuleWithProviders<NgxMockInterceptorModule> {
    return {
      ngModule: NgxMockInterceptorModule,
      providers: [
        { provide: NGX_MOCK_CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    };
  }
}
