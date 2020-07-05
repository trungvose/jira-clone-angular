import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IssueStatus, JIssue } from '@trungk18/interface/issue';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ProjectState, ProjectStore } from './project.store';
@Injectable({
  providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
  constructor(protected store: ProjectStore) {
    super(store);
  }
  
  isLoading$ = this.selectLoading();
  all$ = this.select();
  issues$ = this.select('issues');
  users$ = this.select('users');
  lanes$ = this.select('lanes');

  lastIssuePosition = (status: IssueStatus): number => {
    let raw = this.store.getValue();
    let issuesByStatus = raw.issues.filter((x) => x.status === status);
    return issuesByStatus.length;
  };

  issueByStatusSorted$ = (status: IssueStatus): Observable<JIssue[]> => {
    return this.issues$.pipe(
      map((issues) => {
        let filteredIssues = issues
          .filter((x) => x.status === status)
          .sort((a, b) => a.listPosition - b.listPosition);
        return filteredIssues;
      })
    );
  };

  issueById$(issueId: string) {
    return this.issues$.pipe(
      delay(500),
      map((issues) => {
        let issue = issues.find((x) => x.id === issueId);
        return issue;
      })
    );
  }
}
