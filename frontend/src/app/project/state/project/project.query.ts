import { ProjectState, ProjectStore } from './project.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IssueStatus, JIssue } from '@trungk18/interface/issue';
import { filter, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
  constructor(protected store: ProjectStore) {
    super(store);
  }
  isLoading$ = this.selectLoading();
  all$ = this.select();
  issue$ = this.select('issues');
  
  issueByStatus$ = (status: IssueStatus): Observable<JIssue[]> => {
    return this.select('issues').pipe(
      map((issues) => {
        let filteredIssues = issues.filter((x) => x.status === status);
        return filteredIssues;
      })
    );
  };
  users$ = this.select('users');
}
