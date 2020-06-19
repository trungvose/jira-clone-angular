import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { JUser } from '@trungk18/interface/user';
import { map, finalize, catchError } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient, private _store: AuthStore) {}

  login({ email = '', password = '' }: LoginPayload) {
    this._store.setLoading(true);
    this._http
      .get<JUser>('/data/user.json')
      .pipe(
        map((user) => {
          this._store.update((state) => ({
            ...state,
            ...user
          }));
        }),
        finalize(() => {
          this._store.setLoading(false);
        }),
        catchError((err) => {
          this._store.setError(err);
          return of(err);
        })
      )
      .subscribe();
  }
}

export class LoginPayload {
  email: string;
  password: string;
  constructor() {
    this.email = 'trungk18@gmail.com';
    this.password = `${new Date().getTime()}`;
  }
}
