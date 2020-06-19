import { JProject } from '@trungk18/interface/project';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ProjectState extends JProject {}

function createInitialState(): ProjectState {
  return {
    issues: [],
    users: []
  } as ProjectState;
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'project'
})
export class ProjectStore extends Store<ProjectState> {
  constructor() {
    super(createInitialState());
  }
}
