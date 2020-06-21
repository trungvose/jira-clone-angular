import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { IssueUtil } from '@trungk18/project/utils/issue';

@Component({
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnChanges {
  issueTypeIcon: string;
  @Input() issue: JIssue;

  constructor() {}

  ngOnChanges(): void {
    if (this.issue) {
      this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.type);
    }
  }
}
