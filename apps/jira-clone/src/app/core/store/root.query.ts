import { Injectable } from '@angular/core';
import { AuthQuery } from '../auth/auth.query';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RootQuery {
  constructor(private _auth: AuthQuery, private _project: ProjectQuery) {}

  get loading$(): Observable<boolean> {
    return combineLatest(this._auth.selectLoading(), this._project.selectLoading()).pipe(
      map(([authLoading, projectLoading]) => {
        return authLoading || projectLoading;
      }),
    );
  }
}
