import { Injectable } from '@angular/core';
import { FeatureStore } from "@mini-rx/signal-store";

export interface FilterState {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  ignoreResolved: boolean;
}

export function createInitialFilterState(): FilterState {
  return {
    searchTerm: '',
    userIds: [],
    onlyMyIssue: false,
    ignoreResolved: false
  };
}

@Injectable({
  providedIn: 'root'
})
export class FilterStore extends FeatureStore<FilterState> {
  constructor() {
    super('filter', createInitialFilterState());
  }
}
