import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, filter, switchMap, take } from 'rxjs/operators';
import { ProjectQuery } from './state/project/project.query';
import { ProjectService } from './state/project/project.service';
import { ProjectState } from './state/project/project.store';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {
  constructor(private _projectQuery: ProjectQuery, private _projectService: ProjectService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  getFromStoreOrApi(): Observable<ProjectState> {
    return this._projectQuery.all$.pipe(
      debounceTime(10),
      switchMap((state) => {
        if (!state.id) {
          return this._projectService.getProject();
        }
        return of(state);
      }),
      filter((state) => !!state.id),
      take(1),
      catchError((error) => of(error))
    );
  }
}
