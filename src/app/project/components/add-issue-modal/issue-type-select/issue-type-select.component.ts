import { Component, Input } from '@angular/core';
import { IssueType } from '@trungk18/interface/issue';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { ProjectConst } from '@trungk18/project/config/const';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
    selector: 'issue-type-select',
    templateUrl: './issue-type-select.component.html',
    styleUrls: ['./issue-type-select.component.scss'],
    standalone: true,
    imports: [NzSelectModule, ReactiveFormsModule, NgFor, SvgIconComponent]
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
