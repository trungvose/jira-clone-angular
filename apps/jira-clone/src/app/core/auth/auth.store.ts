import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserInformationDto } from '@trungk18/core/graphql/service/graphql';

export interface AuthState {
  token: string;
  expiry: string;
  currentUser: UserInformationDto;
}

export function createInitialAuthState(): AuthState {
  return {
    currentUser: {} as UserInformationDto,
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
