import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from './core/utilities/input-validation';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { apiCacheInterceptor } from '@core/interceptors/api-cache.interceptor';

export const AppConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiCacheInterceptor, errorInterceptor])),
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }
  ]
};
