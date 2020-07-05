import { Injectable } from '@angular/core';
import { LoginPayload } from '@trungk18/interface/authentication/login-payload';
import { TokenResultApi } from '@trungk18/interface/authentication/token-result';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';
const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      expiry
    }
  }
`;
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _store: AuthStore, private _apollo: Apollo) {}

  login({ email, password }: LoginPayload): Observable<FetchResult> {
    this._store.setLoading(true);
    return this._apollo
      .mutate({
        mutation: loginMutation,
        variables: {
          email,
          password
        }
      })
      .pipe(
        tap(({ data }: { data: TokenResultApi }) => {
          if (data) {
            this._store.update((state) => ({
              ...state,
              ...data.login
            }));
            //TODO Trung removed it, to test the headers for now
            // https://www.apollographql.com/docs/angular/recipes/authentication/
            //TODO anh Chau, need to see how to attach the headers from the authService
            localStorage.setItem('token', data.login.token);
          }
        }),
        finalize(() => {
          this._store.setLoading(false);
        })
      );
  }
}
