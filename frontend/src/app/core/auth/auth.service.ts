import { Injectable } from '@angular/core';
import {
  LoginGQL,
  MeGQL,
  RefreshTokenGQL,
  TokenResultDto,
  UserInformationDto,
  LogoutGQL
} from '@trungk18/core/graphql/service/graphql';
import { LoginPayload } from '@trungk18/interface/payload/login';
import { EMPTY, Observable, of, pipe, Subscription, timer } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AuthStore, createInitialAuthState } from './auth.store';
import { differenceInMilliseconds, subMinutes } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _store: AuthStore,
    private _loginGQL: LoginGQL,
    private _logoutGQL: LogoutGQL,
    private _refreshTokenGQL: RefreshTokenGQL,
    private _meGQL: MeGQL
  ) {}

  private _jwtTimerSubscription: Subscription;

  login({ email, password }: LoginPayload): Observable<UserInformationDto> {
    this._store.setLoading(true);
    return this._loginGQL
      .mutate({
        email,
        password
      })
      .pipe(
        map(({ data }) => data?.login),
        this._handleTokenMe(),
        finalize(() => {
          this._store.setLoading(false);
        })
      );
  }

  logout() {
    return this._logoutGQL.mutate().pipe(
      tap(() => {
        this._store.update(createInitialAuthState());
      })
    );
  }

  retrieveTokenOnPageLoad(): Observable<UserInformationDto> {
    return this._refreshToken().pipe(
      catchError((err) => {
        this._store.update({
          expiry: null,
          token: null
        });
        return of(null);
      }),
      this._handleTokenMe()
    );
  }

  private _refreshToken(): Observable<TokenResultDto> {
    this._store.setLoading(true);
    return this._refreshTokenGQL.fetch().pipe(
      map(({ data }) => data?.refreshToken),
      this._handleTokenMe(),
      catchError(() => {
        this._store.update({
          expiry: null,
          token: null
        });
        //TODO review later
        return of(null);
      }),
      finalize(() => {
        this._store.setLoading(false);
      })
    );
  }

  private _handleTokenMe = () => {
    return pipe<Observable<TokenResultDto>, Observable<UserInformationDto>>(
      switchMap((tokenResult) => {
        this._setupRefreshTimer(tokenResult);
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

  private _me(): Observable<UserInformationDto> {
    return this._meGQL.fetch().pipe(map(({ data }) => data?.me));
  }

  private _setupRefreshTimer(tokenResult: TokenResultDto) {
    let { expiry }: { expiry: string } = tokenResult;
    const delayInMilliseconds = differenceInMilliseconds(
      subMinutes(new Date(expiry), 1),
      new Date()
    );
    if (this._jwtTimerSubscription) {
      this._jwtTimerSubscription.unsubscribe();
    }

    this._jwtTimerSubscription = timer(delayInMilliseconds)
      .pipe(switchMap(() => this.retrieveTokenOnPageLoad()))
      .subscribe();
  }
}
