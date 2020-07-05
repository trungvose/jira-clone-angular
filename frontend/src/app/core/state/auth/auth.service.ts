import { Injectable } from '@angular/core';
import { LoginPayload } from '@trungk18/interface/authentication/login-response';
import { environment } from 'src/environments/environment';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string;
  constructor(private _store: AuthStore) {
    this.baseUrl = environment.apiUrl;
  }

  login({ email = '', password = '' }: LoginPayload): void {
    
  }
}
