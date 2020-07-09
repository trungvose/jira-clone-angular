import { Injectable } from '@angular/core';
import {
  LoginGQL,
  RefreshTokenGQL,
  TokenResultDto,
  MeGQL,
  UserInformationDto
} from '@trungk18/core/graphql/service/graphql';
import { LoginPayload } from '@trungk18/interface/payload/login';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _store: AuthStore,
    private _loginGql: LoginGQL,
    private _refreshTokenGQL: RefreshTokenGQL,
    private _meGQL: MeGQL
  ) {}

  login({ email, password }: LoginPayload): Observable<TokenResultDto> {
    this._store.setLoading(true);
    return this._loginGql
      .mutate({
        email,
        password
      })
      .pipe(
        map(({ data }) => data?.login),
        tap((tokenResult) => {
          if (tokenResult) {
            this._store.update(tokenResult);
          }
        }),
        finalize(() => {
          this._store.setLoading(false);
        })
      );
  }

  private refreshToken() {
    this._store.setLoading(true);
    return this._refreshTokenGQL.fetch().pipe(
      map(({ data }) => data?.refreshToken),
      tap((tokenResult) => {
        if (tokenResult) {
          this._store.update(tokenResult);
        }
      }),
      catchError(() => {
        this._store.update({
          expiry: null,
          token: ''
        });
        //TODO review later
        return of(null);
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }

  private me(): Observable<UserInformationDto> {
    return this._meGQL.fetch().pipe(map(({ data }) => data?.me));
  }
}
