import { Component, Input } from '@angular/core';
import { IssueType } from '@trungk18/interface/issue';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { UntypedFormControl } from '@angular/forms';
import { ProjectConst } from '@trungk18/project/config/const';

@Component({
  selector: 'issue-type-select',
  templateUrl: './issue-type-select.component.html',
  styleUrls: ['./issue-type-select.component.scss']
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
