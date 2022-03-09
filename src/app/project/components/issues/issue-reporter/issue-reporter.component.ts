import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JIssue } from '@trungk18/interface/issue';
import { JUser } from '@trungk18/interface/user';
import { ProjectService } from '@trungk18/project/state/project/project.service';

@Component({
  selector: 'issue-reporter',
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss']
})
@UntilDestroy()
export class IssueReporterComponent implements OnChanges {
  @Input() issue: JIssue;
  @Input() users: JUser[];
  reporter: JUser;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes.issue;
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.reporter = this.users.find((x) => x.id === this.issue.reporterId);
    }
  }

  isUserSelected(user: JUser) {
    return user.id === this.issue.reporterId;
  }

  updateIssue(user: JUser) {
    this._projectService.updateIssue({
      ...this.issue,
      reporterId: user.id
    });
  }
}
