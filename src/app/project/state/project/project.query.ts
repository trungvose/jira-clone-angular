import { ProjectStore } from './project.store';
import { Injectable, Signal } from '@angular/core';
import { IssueStatus, JIssue } from '@trungk18/interface/issue';
import { delay, map } from 'rxjs/operators';
import { toObservable } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProjectQuery {
  isLoading = this.store.select(state => state.isLoading);
  all = this.store.select();
  issues = this.store.select(state => state.issues);
  recentIssues = this.store.select(state => state.issues.slice(0, 5))
  users = this.store.select(state => state.users);

  constructor(protected store: ProjectStore) {
  }

  lastIssuePosition = (status: IssueStatus): number => {
    const raw = this.store.state();
    const issuesByStatus = raw.issues.filter(x => x.status === status);
    return issuesByStatus.length;
  };

  issueByStatusSorted = (status: IssueStatus): Signal<JIssue[]> => this.store.select(
    state =>
      state.issues
        .filter((x) => x.status === status)
        .sort((a, b) => a.listPosition - b.listPosition)
  )

  issueById$(issueId: string) {
    return toObservable(this.issues).pipe(
      delay(500),
      map((issues) => issues.find(x => x.id === issueId))
    );
  }
}
