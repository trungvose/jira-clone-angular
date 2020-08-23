import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { environment } from 'apps/jira-clone/src/environments/environment';
import { AuthQuery } from '../auth/auth.query';
import { ApolloLink } from 'apollo-link';

export function createApollo(httpLink: HttpLink, authQuery: AuthQuery): ApolloClientOptions<any> {
  const link = httpLink.create({ uri: environment.apiUrl });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const httpLinkWithErrorHandling = ApolloLink.from([errorLink, link]);

  return {
    link: httpLinkWithErrorHandling,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthQuery],
    },
  ],
})
export class GraphQLModule {}
