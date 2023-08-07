import { Injectable } from '@angular/core';
import { FilterStore } from './filter.store';

@Injectable({ providedIn: 'root' })
export class FilterQuery {
  any = this.store.select(
    ({ searchTerm, userIds, onlyMyIssue, ignoreResolved }) =>
      !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved
  );
  all = this.store.select();
  userIds = this.store.select(state => state.userIds);
  onlyMyIssue = this.store.select(state => state.onlyMyIssue);
  ignoreResolve = this.store.select(state => state.ignoreResolved);

  constructor(protected store: FilterStore) {
  }
}
