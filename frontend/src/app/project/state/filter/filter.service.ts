import { Injectable } from '@angular/core';
import { FilterStore, createInitialFilterState } from './filter.store';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private store: FilterStore) {}

  updateSearchTerm(searchTerm: string) {
    this.store.update({
      searchTerm
    });
  }

  toggleOnlyMyIssue() {
    this.store.update((state) => {
      let onlyMyIssue = !state.onlyMyIssue;
      return {
        ...state,
        onlyMyIssue
      };
    });
  }

  toggleRecentUpdate() {
    this.store.update((state) => {
      let recentUpdate = !state.recentUpdate;
      return {
        ...state,
        recentUpdate
      };
    });
  }

  resetAll() {
    this.store.update((state) => ({
      ...state,
      ...createInitialFilterState()
    }));
  }
}
