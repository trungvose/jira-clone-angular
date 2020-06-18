import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JProject } from '@trungk18/interface/project';
import { JUser } from '@trungk18/interface/user';
import { ProjectStore } from './project.store';
import { finalize, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient, private _store: ProjectStore) {}

  getProject(): Observable<JProject> {
    this._store.setLoading(true);
    return this._http.get<JProject>('/data/project.json').pipe(
      map(project => {
        this._store.update(state => {
          return {
            ...state,
            ...project
          } 
        })
      }),
      finalize(() => {
        this._store.setLoading(false)
      }),
      catchError(error => {
        this._store.setError(error);
        return of(error)
      })
    );
  }

  login(): Observable<JUser> {
    return this._http.get<JUser>('/data/user.json');
  }
}
