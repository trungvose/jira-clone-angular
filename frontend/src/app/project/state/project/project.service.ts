import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayUpdate } from '@datorama/akita';
import { JIssue } from '@trungk18/interface/issue';
import { JProject } from '@trungk18/interface/project';
import { JUser } from '@trungk18/interface/user';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { ProjectStore } from './project.store';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient, private _store: ProjectStore) {}

  getProject(): Observable<JProject> {
    this._store.setLoading(true);
    return this._http.get<JProject>('/data/project.json').pipe(
      map((project) => {
        this._store.update((state) => {
          return {
            ...state,
            ...project
          };
        });
      }),
      finalize(() => {
        this._store.setLoading(false);
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    );
  }

  login(): Observable<JUser> {
    return this._http.get<JUser>('/data/user.json');
  }

  updateIssue(issue: JIssue) {
    this._store.update((state) => {
      let issues = arrayUpdate(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
  }
}
