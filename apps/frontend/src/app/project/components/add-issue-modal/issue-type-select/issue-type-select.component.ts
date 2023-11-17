import { Component, Input } from '@angular/core';
import { IssueType } from '@trunk18/interface';
import { IssueUtil } from '@trunk18/project';
import { IssueTypeWithIcon } from '@trunk18/project';
import { UntypedFormControl } from '@angular/forms';
import { ProjectConst } from '@trunk18/project';

@Component({
  selector: 'issue-type-select',
  templateUrl: './issue-type-select.component.html',
  styleUrls: ['./issue-type-select.component.scss'],
})
export class IssueTypeSelectComponent {
  @Input() control: UntypedFormControl;

  issueTypes: IssueTypeWithIcon[];

  constructor() {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  getIssueTypeIcon(issueType: IssueType) {
    return IssueUtil.getIssueTypeIcon(issueType);
  }
}
