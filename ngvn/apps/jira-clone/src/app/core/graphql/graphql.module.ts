import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';
import { environment } from 'apps/jira-clone/src/environments/environment';
import { AuthQuery } from '../auth/auth.query';

export function createApollo(httpLink: HttpLink, authQuery: AuthQuery): ApolloClientOptions<any> {
  const link = httpLink.create({ uri: environment.apiUrl });
  return {
    link,
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthQuery]
    }
  ]
})
export class GraphQLModule {}
