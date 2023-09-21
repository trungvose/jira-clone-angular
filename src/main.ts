import { enableProdMode, ErrorHandler, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { QuillModule } from 'ngx-quill';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AppRoutingModule } from './app/app-routing.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

const initSentry = () => {
  Sentry.init({
    dsn: 'https://b2af8332e38f486d910f06b79df66365@o495789.ingest.sentry.io/5569161',
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', 'https://jira.trungk18.com/'],
        routingInstrumentation: Sentry.routingInstrumentation
      })
    ],

    tracesSampleRate: 1.0
  });
};

if (environment.production) {
  enableProdMode();
  initSentry();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ReactiveFormsModule, AppRoutingModule, NzSpinModule, NzIconModule.forRoot([]), environment.production ? [] : AkitaNgDevtools, AkitaNgRouterStoreModule, QuillModule.forRoot()),
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
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch((err) => console.error(err));
