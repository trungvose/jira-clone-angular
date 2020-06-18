import { ProjectState, ProjectStore } from './project.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
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
}
