import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProjectDto } from '@trungk18/core/graphql/service/graphql';

export interface ProjectState extends ProjectDto {}

function createInitialState(): ProjectState {
  return {
    users: [],
    lanes: []
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
