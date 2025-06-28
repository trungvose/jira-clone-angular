import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { init, browserTracingIntegration } from '@sentry/angular';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

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

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
