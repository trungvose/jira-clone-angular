import { Injectable } from '@angular/core';
import { LoginPayload, TokenResultApi } from '@trungk18/interface/authentication/login-response';
import { AuthStore } from './auth.store';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
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

  login({ email = '', password = '' }: LoginPayload): void {
    this._apollo
      .mutate({
        mutation: loginMutation,
        variables: {
          email,
          password
        }
      })
      .subscribe(({ data: tokenResult }: { data: TokenResultApi }) => {
        this._store.update((state) => ({
          ...state,
          ...tokenResult
        }));
      });
  }
}
