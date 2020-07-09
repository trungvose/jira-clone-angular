import { Injectable } from '@angular/core';
import { LoginGQL, TokenResultDto } from '@trungk18/core/graphql/service/graphql';
import { LoginPayload } from '@trungk18/interface/payload/login';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _store: AuthStore, private _loginGql: LoginGQL) {}

  login({ email, password }: LoginPayload): Observable<TokenResultDto> {
    this._store.setLoading(true);
    return this._loginGql
      .mutate({
        email,
        password
      })
      .pipe(
        map(({ data }) => data.login),
        tap((tokenResult) => {
          if (tokenResult) {
            this._store.update((state) => ({
              ...state,
              ...tokenResult
            }));
          }
        }),
        finalize(() => {
          this._store.setLoading(false);
        })
      );
  }
}
