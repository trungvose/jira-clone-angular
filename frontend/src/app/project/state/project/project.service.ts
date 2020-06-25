import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayUpdate, arrayUpsert } from '@datorama/akita';
import { JIssue } from '@trungk18/interface/issue';
import { JProject } from '@trungk18/interface/project';
import { JUser } from '@trungk18/interface/user';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { ProjectStore } from './project.store';
import { JComment } from '@trungk18/interface/comment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient, private _store: ProjectStore) {}

  getProject(): Subscription {
    this._store.setLoading(true);
    return this._http
      .get<JProject>('/data/project.json')
      .pipe(
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
      )
      .subscribe();
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

  updateIssueComment(issueId: string, comment: JComment) {
    let allIssues = this._store.getValue().issues;
    let issue = allIssues.find((x) => x.id === issueId);
    if (!issue) {
      return;
    }

    let comments = arrayUpsert(issue.comments ?? [], comment.id, comment);
    this.updateIssue({
      ...issue,
      comments
    });
  }
}
