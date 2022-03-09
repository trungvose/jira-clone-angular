import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

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

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
