import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { JFilter } from 'src/app/interface/filter';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
@Component({
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  filter: JFilter;
  searchControl: FormControl = new FormControl();
  @Output() filterChanged = new EventEmitter();
  constructor() {
    this.filter = new JFilter();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((term) => {
        this.filter.searchTerm = term;
      });
  }

  recentUpdateChanged() {
    this.filter.recentUpdate = !this.filter.recentUpdate;
  }

  onlyMyIssueChanged() {
    this.filter.onlyMyIssue = !this.filter.onlyMyIssue;
  }

  resetAll() {
    this.filter = new JFilter();
  }
}
