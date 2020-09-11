import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { JiraControlModule } from './jira-control/jira-control.module';
import { GraphQLModule } from './core/graphql/graphql.module';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { WithCredentialInterceptorProvider } from './core/interceptors/with-credential.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JiraControlModule,
    NzSpinModule,
    NzIconModule.forRoot([]),
    environment.production ? [] : AkitaNgDevtools,
    AkitaNgRouterStoreModule,
    GraphQLModule
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }
    },
    WithCredentialInterceptorProvider,
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
