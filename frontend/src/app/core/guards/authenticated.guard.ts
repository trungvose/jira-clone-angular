import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { AuthQuery } from '../auth/auth.query';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private _authQuery: AuthQuery,
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(): Observable<boolean> {
    return this._authQuery.token$.pipe(
      switchMap((token) => {
        if (!token) {
          return this._authService.retrieveTokenOnPageLoad().pipe(
            mapTo(true),
            catchError(err => {
              // Do something with 401
              return this._authService.logout().pipe(mapTo(false), tap(() => {
                this._router.navigate(['/login']);
              }));
            })
          );
        }
        return of(true);
      })
    );
  }
}
