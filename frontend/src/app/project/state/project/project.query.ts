import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProjectIssueDto, ProjectLaneDto } from '@trungk18/core/graphql/service/graphql';
import { delay, map } from 'rxjs/operators';
import { ProjectState, ProjectStore } from './project.store';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
  constructor(protected store: ProjectStore) {
    super(store);
  }

  isLoading$ = this.selectLoading();
  all$ = this.select();
  users$ = this.select('users');
  lanes$ = this.select('lanes');
  issues$ = of([]);

  issueById$(issueId: string) {
    return this.lanes$.pipe(
      delay(500),
      map((lanes) => {
        return lanes.reduce(
          (issues: ProjectIssueDto[], lane: ProjectLaneDto) => [...issues, ...lane.issues],
          []
        );
      }),
      map((issues) => {
        let issue = issues.find((x) => x.id === issueId);
        return issue;
      })
    );
  }
}
