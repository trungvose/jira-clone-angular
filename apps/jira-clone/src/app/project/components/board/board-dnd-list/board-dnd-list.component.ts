import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterQuery } from '@trungk18/project/state/filter/filter.query';
import { FilterState } from '@trungk18/project/state/filter/filter.store';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';
import * as dateFns from 'date-fns';
import { ProjectIssueDto, ProjectIssueStatus, ProjectLaneDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@UntilDestroy()
export class BoardDndListComponent implements OnInit {
  @Input() lane: ProjectLaneDto;
  @Input() currentUserId: string;

  filteredIssues: ProjectIssueDto[] = [];

  get issues(): ProjectIssueDto[] {
    return this.lane?.issues ?? [];
  }

  get issuesCount(): number {
    return this.filteredIssues.length;
  }

  constructor(private _projectService: ProjectService, private _filterQuery: FilterQuery) {}

  ngOnInit(): void {
    this._filterQuery.all$.pipe(untilDestroyed(this)).subscribe((filter) => {
      this.filteredIssues = this.filterIssues(this.issues, filter);
    });
  }

  drop(event: CdkDragDrop<ProjectIssueDto[]>) {
    let newIssue: ProjectIssueDto = { ...event.item.data };
    let newIssues = [...event.container.data];
    if (event.previousContainer === event.container) {
      let hasMoved = event.previousIndex !== event.currentIndex;
      if (!hasMoved) {
        return;
      }
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this._projectService
        .reorderIssues(
          this.lane.id,
          newIssues,
        )
        .subscribe();
    } else {
      transferArrayItem(event.previousContainer.data, newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
      newIssue.status = event.container.id as ProjectIssueStatus;
      this._projectService.updateIssue(newIssue);
    }
  }

  private updateListPosition(newList: ProjectIssueDto[]) {
    newList.forEach((issue, idx) => {
      let newIssueWithNewPosition = { ...issue, listPosition: idx + 1 };
      this._projectService.updateIssue(newIssueWithNewPosition);
    });
  }

  filterIssues(issues: ProjectIssueDto[], filter: FilterState): ProjectIssueDto[] {
    const { onlyMyIssue, ignoreResolved, searchTerm, userIds } = filter;
    return issues.filter((issue) => {
      let isMatchTerm = searchTerm ? IssueUtil.searchString(issue.title, searchTerm) : true;

      let issueUserId = issue.main.id;
      let isIncludeUsers = userIds.length ? userIds.includes(issueUserId) : true;

      let isMyIssue = onlyMyIssue ? this.currentUserId && issueUserId === this.currentUserId : true;

      let isIgnoreResolved = ignoreResolved ? issue.status !== ProjectIssueStatus.Done : true;

      return isMatchTerm && isIncludeUsers && isMyIssue && isIgnoreResolved;
    });
  }

  isDateWithinThreeDaysFromNow(date: string) {
    let now = new Date();
    let inputDate = new Date(date);
    return dateFns.isAfter(inputDate, dateFns.subDays(now, 3));
  }
}
