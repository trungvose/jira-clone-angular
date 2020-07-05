import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { AuthQuery } from '../state/auth/auth.query';

export function createApollo(httpLink: HttpLink, authQuery: AuthQuery) {
  const auth = setContext((operation, context) => {
    let excludesOperations = ['Login'];
    if (excludesOperations.includes(operation.operationName)) {
      return {};
    }
    let headerWithToken = {
      headers: {
        Authorization: `Bearer ${authQuery.token}`
      }
    };
    console.log(authQuery.token);
    return headerWithToken;
  });

  const link = ApolloLink.from([auth, httpLink.create({ uri: environment.apiUrl })]);
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
