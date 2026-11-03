import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockAuthInterceptor } from './auth/interceptors/mock-auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    //importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([MockAuthInterceptor])
    ),
    provideAnimationsAsync()
  ]
};