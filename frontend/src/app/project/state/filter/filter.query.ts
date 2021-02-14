import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FilterStore, FilterState } from './filter.store';

@Injectable({ providedIn: 'root' })
export class FilterQuery extends Query<FilterState> {
  any$ = this.select(
    ({ searchTerm, userIds, onlyMyIssue, ignoreResolved }) =>
      !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved
  );
  all$ = this.select();
  userIds$ = this.select('userIds');
  onlyMyIssue$ = this.select('onlyMyIssue');
  ignoreResolve$ = this.select('ignoreResolved');

  constructor(protected store: FilterStore) {
    super(store);
  }
}
