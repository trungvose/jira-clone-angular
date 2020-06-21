import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IssueType, JIssue } from '@trungk18/interface/issue';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectService } from '@trungk18/project/state/project/project.service';

@Component({
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;
  selectedIssueType: IssueType;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.selectedIssueType);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.issueTypes = [
      new IssueTypeWithIcon(IssueType.BUG),
      new IssueTypeWithIcon(IssueType.STORY),
      new IssueTypeWithIcon(IssueType.TASK)
    ];
  }

  ngOnChanges(): void {
    if (this.issue) {
      this.selectedIssueType = this.issue.type;
    }
  }

  updateIssue(issueType: IssueType) {
    this.selectedIssueType = issueType;
    this._projectService.updateIssue({
      ...this.issue,
      type: this.selectedIssueType
    });
  }

  isTypeSelected(type: IssueType) {
    return this.selectedIssueType === type;
  }
}

class IssueTypeWithIcon {
  value: string;
  icon: string;

  constructor(issueType: IssueType) {
    this.value = issueType;
    this.icon = IssueUtil.getIssueTypeIcon(issueType);
  }
}
