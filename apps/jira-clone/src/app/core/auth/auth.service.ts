import { Injectable } from '@angular/core';
import {
  LoginGQL,
  MeGQL,
  RefreshTokenGQL,
  TokenResultDto,
  UserInformationDto,
  LogoutGQL,
  RegisterGQL,
} from '@trungk18/core/graphql/service/graphql';
import { LoginPayload } from '@trungk18/interface/payload/login';
import { EMPTY, Observable, of, pipe, Subscription, throwError, timer } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AuthStore, createInitialAuthState } from './auth.store';
import { differenceInMilliseconds, subMinutes } from 'date-fns';
import { setLoading } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private _store: AuthStore,
    private _loginGql: LoginGQL,
    private _logoutGql: LogoutGQL,
    private _registerGql: RegisterGQL,
    private _refreshTokenGql: RefreshTokenGQL,
    private _meGql: MeGQL,
  ) {}

  private _jwtTimerSubscription: Subscription;

  login({ email, password }: LoginPayload): Observable<UserInformationDto> {
    this._store.setLoading(true);
    return this._loginGql
      .mutate({
        email,
        password,
      })
      .pipe(
        map(({ data }) => data?.login),
        this._handleTokenMe(),
        finalize(() => {
          this._store.setLoading(false);
        }),
      );
  }

  register(email: string, password: string, fullName: string) {
    this._registerGql.mutate({
      email,
      password,
      fullName,
    });
  }

  logout() {
    return this._logoutGql.mutate().pipe(
      tap(() => {
        this._store.update(createInitialAuthState());
      }),
    );
  }

  retrieveTokenOnPageLoad(): Observable<UserInformationDto> {
    return this._refreshToken().pipe(
      catchError((err) => {
        this._store.update({
          expiry: null,
          token: null,
        });
        return throwError(err);
      }),
      this._handleTokenMe(),
    );
  }

  private _refreshToken(): Observable<TokenResultDto> {
    return this._refreshTokenGql.fetch().pipe(
      setLoading(this._store),
      map(({ data }) => data?.refreshToken),
      catchError((err) => {
        this._store.update({
          expiry: null,
          token: null,
        });
        return throwError(err);
      }),
    );
  }

  private _handleTokenMe = () => {
    return pipe<Observable<TokenResultDto>, Observable<UserInformationDto>>(
      switchMap((tokenResult) => {
        this._store.update({
          ...tokenResult,
        });
        this._setupRefreshTimer(tokenResult);
        return this._me().pipe(
          tap((user) => {
            this._store.update({
              currentUser: user,
            });
          }),
          catchError((err) => {
            this._store.update({
              currentUser: null,
            });
            return EMPTY;
          }),
        );
      }),
    );
  };

  private _me(): Observable<UserInformationDto> {
    return this._meGql.fetch().pipe(map(({ data }) => data?.me));
  }

  private _setupRefreshTimer(tokenResult: TokenResultDto) {
    let { expiry }: { expiry: string } = tokenResult;
    const delayInMilliseconds = differenceInMilliseconds(subMinutes(new Date(expiry), 1), new Date());
    if (this._jwtTimerSubscription) {
      this._jwtTimerSubscription.unsubscribe();
    }

    this._jwtTimerSubscription = timer(delayInMilliseconds)
      .pipe(switchMap(() => this.retrieveTokenOnPageLoad()))
      .subscribe();
  }
}
