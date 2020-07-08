import { Component, Input, OnInit } from '@angular/core';
import { IssueStatusDisplay } from '@trungk18/interface/ui-model/colors';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { ProjectIssueStatus, ProjectIssueDto } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {
  @Input() issue: ProjectIssueDto;
  IssueStatusDisplay = IssueStatusDisplay;

  variants = {
    [ProjectIssueStatus.Backlog]: 'btn-secondary',
    [ProjectIssueStatus.Selected]: 'btn-secondary',
    [ProjectIssueStatus.InProgress]: 'btn-primary',
    [ProjectIssueStatus.Done]: 'btn-success'
  };

  issueStatuses: IssueStatusValueTitle[];

  constructor(private _projectService: ProjectService, private _projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    this.issueStatuses = [
      new IssueStatusValueTitle(ProjectIssueStatus.Backlog),
      new IssueStatusValueTitle(ProjectIssueStatus.Selected),
      new IssueStatusValueTitle(ProjectIssueStatus.InProgress),
      new IssueStatusValueTitle(ProjectIssueStatus.Done)
    ];
  }

  updateIssue(status: ProjectIssueStatus) {
    //TODO Update index and send GQL
    this._projectService.updateIssue({
      ...this.issue,
      status
    });
  }

  isStatusSelected(status: ProjectIssueStatus) {
    return this.issue.status === status;
  }
}

class IssueStatusValueTitle {
  value: ProjectIssueStatus;
  label: string;
  constructor(issueStatus: ProjectIssueStatus) {
    this.value = issueStatus;
    this.label = IssueStatusDisplay[issueStatus];
  }
}
