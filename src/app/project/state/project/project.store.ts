import { JProject } from '@trungk18/interface/project';
import { Injectable } from '@angular/core';
import { FeatureStore } from "@mini-rx/signal-store";

export type ProjectState = JProject;

function createInitialState(): ProjectState {
  return {
    issues: [],
    users: []
  } as ProjectState;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectStore extends FeatureStore<ProjectState> {
  constructor() {
    super('project', createInitialState());
  }

  setLoading(isLoading: boolean) {
    this.update({isLoading});
  }

  setError(error: string) {
    this.update({error});
  }
}
