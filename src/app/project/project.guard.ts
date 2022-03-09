import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, filter, switchMap, take, map } from 'rxjs/operators';
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
    return combineLatest([this._projectQuery.all$, this._projectQuery.isLoading$]).pipe(
      map(([state, loading]) => {
        if (!loading) {
          this._projectService.getProject();
        }
        return state;
      }),
      filter((state) => !!state.id),
      take(1),
      catchError((error) => of(error))
    );
  }
}
