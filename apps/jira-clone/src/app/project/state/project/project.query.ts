import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProjectIssueDto, ProjectLaneDto } from '@trungk18/core/graphql/service/graphql';
import { delay, map } from 'rxjs/operators';
import { ProjectState, ProjectStore } from './project.store';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectQuery extends Query<ProjectState> {
  constructor(protected store: ProjectStore) {
    super(store);
  }

  isLoading$ = this.selectLoading();
  all$ = this.select();
  users$ = this.select('users');
  lanes$ = this.select('lanes');
  issues$: Observable<ProjectIssueDto[]> = this.lanes$.pipe(
    map((lanes) => {
      return lanes.reduce((issues, lane) => [...issues, ...lane.issues], []);
    }),
  );
}
