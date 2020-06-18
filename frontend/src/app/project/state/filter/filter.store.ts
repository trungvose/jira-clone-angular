import { JProject } from '@trungk18/interface/project';
import { Store, StoreConfig } from '@datorama/akita';
import { JFilter } from '@trungk18/interface/filter';
import { Injectable } from '@angular/core';

export interface FilterState {
  filter: JFilter;
}

function createInitialState(): FilterState {
  return {
    filter: new JFilter()
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'filter'
})
export class FilterStore extends Store<FilterState> {
  constructor() {
    super(createInitialState());
  }
}
