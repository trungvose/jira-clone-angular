import { ProjectState, ProjectStore } from './project.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IssueStatus, JIssue } from '@trungk18/interface/issue';
import { filter, map, delay } from 'rxjs/operators';
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
  users$ = this.select('users');

  issueByStatusSorted$ = (status: IssueStatus): Observable<JIssue[]> => {
    return this.issue$.pipe(
      map((issues) => {
        let filteredIssues = issues
          .filter((x) => x.status === status)
          .sort((a, b) => a.listPosition - b.listPosition);
        return filteredIssues;
      })
    );
  };

  issueById$(issueId: string){
    return this.issue$.pipe(
      delay(500),
      map((issues) => {
        let issue = issues.find(x => x.id === issueId);
        return issue;
      })
    )
  }
}
