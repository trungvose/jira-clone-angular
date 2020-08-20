import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthQuery } from '../auth/auth.query';
import { JiraRoutingConst } from '../utils/jira-routing.const';

@Injectable({
  providedIn: 'root'
})
export class UnAuthenticatedGuard implements CanActivate {
  constructor(private _authQuery: AuthQuery, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._authQuery.token$.pipe(
      map((token) => {
        if (token) {
          this._router.navigate([`/${JiraRoutingConst.Projects}`]);
          return false;
        }
        return true;
      })
    );
  }
}
