import { Injectable } from '@angular/core';
import { AuthStore, AuthState } from './auth.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }
  get token(): string {
    return this.getValue().token;
  }

  get tokenExpiry(): string {
    return this.getValue().token;
  }

  token$ = this.select('token');
  tokenExpiry$ = this.select('expiry');
  user$ = this.select('currentUser');

  userId$ = this.select((state) => {
    if (state.currentUser) {
      return state.currentUser.id;
    }
    return null;
  });
}
