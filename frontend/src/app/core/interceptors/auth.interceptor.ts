import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, combineLatest, defer } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthQuery } from '../auth/auth.query';
import { take, mergeMap, switchMap } from 'rxjs/operators';
import { isAfter } from 'date-fns';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _authQuery: AuthQuery) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return combineLatest([this._authQuery.token$, this._authQuery.tokenExpiry$]).pipe(
      take(1),
      mergeMap(([token, expiredDate]) => {
        if (!token) {
          return next.handle(req);
        }
        const cloneReq = req.clone({
          headers: req.headers.set('Authentication', `Bearer ${token}`)
        });
        return defer(() => {
          let isExpired = isAfter(new Date(), new Date(expiredDate));
          return isExpired
            ? this._authService
                .retrieveTokenOnPageLoad()
                .pipe(switchMap(() => next.handle(cloneReq)))
            : next.handle(cloneReq);
        });
      })
    );
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
