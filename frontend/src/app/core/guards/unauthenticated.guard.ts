import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthQuery } from '../auth/auth.query';

@Injectable({
  providedIn: 'root'
})
export class UnAuthenticatedGuard implements CanActivate {
  constructor(private _authQuery: AuthQuery, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._authQuery.token$.pipe(
      map((token) => !token),
      tap((hasNoToken) => {
        if (!hasNoToken) {
          this._router.navigate(['/projects']);
        }
      })
    );
  }
}
