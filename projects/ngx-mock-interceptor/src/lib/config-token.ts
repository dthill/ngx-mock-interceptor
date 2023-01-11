import { InjectionToken } from '@angular/core';
import { MockConfig } from './config';

export const NGX_MOCK_CONFIG = new InjectionToken<MockConfig>(
  'ngx-mock-config'
);
