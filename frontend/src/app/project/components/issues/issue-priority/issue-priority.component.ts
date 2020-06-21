import { Component, Input, OnChanges } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';
import { IssueUtil } from '@trungk18/project/utils/issue';

@Component({
  selector: 'issue-priority',
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss']
})
export class IssuePriorityComponent implements OnChanges {
  priorityIcon: IssuePriorityIcon;
  @Input() issue: JIssue;

  constructor() {}

  ngOnChanges(): void {
    this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue?.priority);
  }
}
