import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ProjectIssueDto, UserDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-reporter',
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss']
})
@UntilDestroy()
export class IssueReporterComponent implements OnInit, OnChanges {
  @Input() issue: ProjectIssueDto;
  @Input() users: UserDto[];
  reporter: UserDto;

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    let issueChange = changes.issue;
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      //TODO Check reporter with anh Chau
      // this.reporter = this.users.find((x) => x.id === this.issue.repo);
    }
  }

  isUserSelected(user: UserDto) {
    return false;
    //TODO Check reporter with anh Chau
    // return user.id === this.issue.reporterId;
  }

  updateIssue(user: UserDto) {
    //TODO Check reporter with anh Chau
    // this._projectService.updateIssue({
    //   ...this.issue,
    //   reporterId: user.id
    // });
  }
}
