import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayUpdate, arrayUpsert, arrayRemove } from '@datorama/akita';
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

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  getProject(): Subscription {
    this.setLoading(true)
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
          this.setLoading(false)
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

  updateProject(project: Partial<JProject>) {
    this._store.update((state) => ({
      ...state,
      ...project
    }));
  }

  updateIssue(issue: JIssue) {
    this._store.update((state) => {
      let issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
  }

  deleteIssue(issueId: string) {
    this._store.update((state) => {
      let issues = arrayRemove(state.issues, issueId);
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
