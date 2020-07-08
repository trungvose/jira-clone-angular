import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserDto } from '@trungk18/core/graphql/service/graphql';

export interface AuthState {
  token: string;
  expiry: string;
  currentUser: UserDto;
}

export function createInitialAuthState(): AuthState {
  return {
    currentUser: {} as UserDto,
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
