import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery {
  user = this.store.select();
  userId = this.store.select(state => state.id);

  constructor(protected store: AuthStore) {}
}
