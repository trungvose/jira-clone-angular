import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterQuery } from '@trungk18/project/state/filter/filter.query';
import { FilterService } from '@trungk18/project/state/filter/filter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { JUser } from '@trungk18/interface/user';
import { ButtonComponent } from '../../../../jira-control/button/button.component';
import { AvatarComponent } from '../../../../jira-control/avatar/avatar.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { InputComponent } from '../../../../jira-control/input/input.component';

@Component({
    selector: 'board-filter',
    templateUrl: './board-filter.component.html',
    styleUrls: ['./board-filter.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, InputComponent, NgFor, NzToolTipModule, AvatarComponent, ButtonComponent, NgIf, AsyncPipe]
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  searchControl: UntypedFormControl = new UntypedFormControl('');
  userIds: string[];

  constructor(
    public projectQuery: ProjectQuery,
    public filterQuery: FilterQuery,
    public filterService: FilterService
  ) {
    this.userIds = [];
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((term) => {
        this.filterService.updateSearchTerm(term);
      });

    this.filterQuery.userIds$.pipe(untilDestroyed(this)).subscribe((userIds) => {
      this.userIds = userIds;
    });
  }

  isUserSelected(user: JUser) {
    return this.userIds.includes(user.id);
  }

  ignoreResolvedChanged() {
    this.filterService.toggleIgnoreResolve();
  }

  onlyMyIssueChanged() {
    this.filterService.toggleOnlyMyIssue();
  }

  userChanged(user: JUser) {
    this.filterService.toggleUserId(user.id);
  }

  resetAll() {
    this.searchControl.setValue('');
    this.filterService.resetAll();
  }
}
