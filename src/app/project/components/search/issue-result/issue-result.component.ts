import { Component, Input } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';

@Component({
    selector: 'issue-result',
    templateUrl: './issue-result.component.html',
    styleUrls: ['./issue-result.component.scss'],
    standalone: true,
    imports: [SvgIconComponent]
})
export class IssueResultComponent {
  @Input() issue: JIssue;

  get issueTypeIcon() {
    return IssueUtil.getIssueTypeIcon(this.issue?.type);
  }

  constructor() {}
}
