import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IssueType, JIssue } from '@trungk18/interface/issue';
import { IssueTypes, IssueTypeWithIcon } from '@trungk18/interface/issue-type';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';

@Component({
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.issue.type);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private _projectService: ProjectService) {
    this.issueTypes = IssueTypes;
  }

  ngOnInit() {
    
  }

  ngOnChanges(): void {
    
  }

  updateIssue(issueType: IssueType) {
    this._projectService.updateIssue({
      ...this.issue,
      type: issueType
    });
  }

  isTypeSelected(type: IssueType) {
    return this.issue.type === type;
  }
}
