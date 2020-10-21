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
  issues$ = this.select('issues');
  users$ = this.select('users');

  lastIssuePosition = (status: IssueStatus): number => {
    const raw = this.store.getValue();
    const issuesByStatus = raw.issues.filter(x => x.status === status);
    return issuesByStatus.length;
  }

  issueByStatusSorted$ = (status: IssueStatus): Observable<JIssue[]> => {
    return this.issues$.pipe(
      map((issues) => {
        const filteredIssues = issues
          .filter((x) => x.status === status)
          .sort((a, b) => a.listPosition - b.listPosition);
        return filteredIssues;
      })
    );
  }

  issueById$(issueId: string){
    return this.issues$.pipe(
      delay(500),
      map((issues) => {
        const issue = issues.find(x => x.id === issueId);
        return issue;
      })
    );
  }
}
