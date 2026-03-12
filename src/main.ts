import { enableProdMode, ErrorHandler, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';
import { init, browserTracingIntegration } from '@sentry/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { QuillModule } from 'ngx-quill';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

const initSentry = () => {
  init({
    dsn: 'https://b2af8332e38f486d910f06b79df66365@o495789.ingest.sentry.io/5569161',
    integrations: [
      browserTracingIntegration(),
    ],
    tracePropagationTargets: ['localhost', 'jira.trungk18.com'],
    tracesSampleRate: 1.0
  });
};

if (environment.production) {
  enableProdMode();
  initSentry();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            NzIconModule.forRoot([]),
            environment.production ? [] : AkitaNgDevtools,
            AkitaNgRouterStoreModule,
            QuillModule.forRoot()
        ),
        {
            provide: NG_ENTITY_SERVICE_CONFIG,
            useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }
        },
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler()
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => { },
            deps: [Sentry.TraceService],
            multi: true,
        },
    ]
})
  .catch((err) => console.error(err));
