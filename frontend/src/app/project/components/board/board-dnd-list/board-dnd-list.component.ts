import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IssueStatusDisplay, IssueStatus, JIssue } from '@trungk18/interface/issue';
import { FilterState } from '@trungk18/project/state/filter/filter.store';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss']
})
export class BoardDndListComponent implements OnInit {
  IssueStatusDisplay = IssueStatusDisplay;
  @Input() status: IssueStatus;
  @Input() currentUserId: string;
  @Input() issues: JIssue[];
  get issuesCount(): number {
    return 0;
  }

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray([], event.previousIndex, event.currentIndex);
  }
  
  filterIssues(issues: JIssue[], filter: FilterState): JIssue[] {
    const { onlyMyIssue, recentUpdate, searchTerm, userIds } = filter;
    return issues.filter((issue) => {
      let isMatchTerm = searchTerm
        ? issue.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
        : true;

      let isIncludeUsers = userIds.length
        ? issue.userIds.some((userId) => userIds.includes(userId))
        : true;
      let isMyIssue = onlyMyIssue
        ? this.currentUserId && issue.userIds.includes(this.currentUserId)
        : true;

      return isMatchTerm && isIncludeUsers && isMyIssue;
    });
  }
}
