import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectConst } from '@trungk18/project/config/const';
import { ProjectIssueDto, ProjectIssueType } from '@trungk18/core/graphql/service/graphql';

@Component({
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit, OnChanges {
  @Input() issue: ProjectIssueDto;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.issue.type);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private _projectService: ProjectService) {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  ngOnInit() {}

  ngOnChanges(): void {}

  updateIssue(issueType: ProjectIssueType) {
    this._projectService.updateIssue({
      ...this.issue,
      type: issueType
    });
  }

  isTypeSelected(type: ProjectIssueType) {
    return this.issue.type === type;
  }
}
