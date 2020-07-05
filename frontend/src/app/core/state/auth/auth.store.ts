import { Injectable } from '@angular/core';
import { JUser } from '@trungk18/interface/user';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  token: string;
  expiry: string;
  currentUser: JUser;
}

export function createInitialAuthState(): AuthState {
  return {
    currentUser: {} as JUser,
    token: null,
    expiry: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'auth'
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialAuthState());
  }
}
