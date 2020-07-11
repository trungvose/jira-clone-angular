import { Injectable } from '@angular/core';
import {
  LoginGQL,
  RefreshTokenGQL,
  TokenResultDto,
  MeGQL,
  UserInformationDto
} from '@trungk18/core/graphql/service/graphql';
import { LoginPayload } from '@trungk18/interface/payload/login';
import { Observable, of, throwError, pipe, EMPTY } from 'rxjs';
import { catchError, finalize, map, tap, switchMap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _store: AuthStore,
    private _loginGql: LoginGQL,
    private _refreshTokenGQL: RefreshTokenGQL,
    private _meGQL: MeGQL
  ) {}

  login({ email, password }: LoginPayload): Observable<UserInformationDto> {
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
        }),
        this.handleTokenMe()
      );
  }

  retrieveTokenOnPageLoad(): Observable<UserInformationDto> {
    return this._refreshToken().pipe(
      catchError((err) => {
        this._store.update({
          expiry: null,
          token: ''
        });
        return of(null);
      }),
      this.handleTokenMe()
    );
  }

  private handleTokenMe = () => {
    return pipe<Observable<TokenResultDto>, Observable<UserInformationDto>>(
      switchMap((tokenResult) => {
        return this._me().pipe(
          tap((user) => {
            this._store.update({
              currentUser: user
            });
          }),
          catchError((err) => {
            this._store.update({
              currentUser: null
            });
            return EMPTY;
          })
        );
      })
    );
  };

  private _refreshToken(): Observable<TokenResultDto> {
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

  private _me(): Observable<UserInformationDto> {
    return this._meGQL.fetch().pipe(map(({ data }) => data?.me));
  }
}
