import { Injectable } from '@angular/core';
import { AuthStore, AuthState } from './auth.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  user$ = this.select();
  userId$ = this.select('id');
}
