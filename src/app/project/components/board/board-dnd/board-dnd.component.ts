import { Component, computed } from '@angular/core';
import { IssueStatus, JIssue } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { AuthQuery } from '@trungk18/project/auth/auth.query';
import { FilterState } from "@trungk18/project/state/filter/filter.store";
import { IssueUtil } from "@trungk18/project/utils/issue";
import { FilterQuery } from "@trungk18/project/state/filter/filter.query";

@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  getFilteredIssuesForStatus(status: IssueStatus) {
    return  computed(() => {
      const issues = this.projectQuery.issueByStatusSorted(status);
      return filterIssues(issues(), this._filterQuery.all(), this.authQuery.userId())
  })}

  constructor(public projectQuery: ProjectQuery, private _filterQuery: FilterQuery, public authQuery: AuthQuery) {}
}

function filterIssues(issues: JIssue[], filter: FilterState, currentUserId: string): JIssue[] {
  const { onlyMyIssue, ignoreResolved, searchTerm, userIds } = filter;
  return issues.filter((issue) => {
    const isMatchTerm = searchTerm ? IssueUtil.searchString(issue.title, searchTerm) : true;

    const isIncludeUsers = userIds.length
      ? issue.userIds.some((userId) => userIds.includes(userId))
      : true;

    const isMyIssue = onlyMyIssue
      ? currentUserId && issue.userIds.includes(currentUserId)
      : true;

    const isIgnoreResolved = ignoreResolved ? issue.status !== IssueStatus.DONE : true;

    return isMatchTerm && isIncludeUsers && isMyIssue && isIgnoreResolved;
  });
}
